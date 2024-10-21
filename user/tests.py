from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import CustomUser, Address
from django.db.utils import IntegrityError

User = get_user_model()

class CustomUserModelTests(TestCase):

    def setUp(self):
        self.address = Address.objects.create(
            cep="58701068",
            number="123"
        )
        self.user = CustomUser.objects.create_user(
            username="testuser",
            email="testuser@gmail.com",
            password="password123",
            phone="111111111",
            address=self.address
        )

    def test_soft_delete(self):
        """Testa se o soft delete está funcionando corretamente"""
        self.user.delete() 
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_active) 
        self.assertIsNotNone(self.user.deleted_at)
        
        active_users = CustomUser.objects.filter(is_active=True)
        self.assertNotIn(self.user, active_users)  

        all_users_in_db = CustomUser.objects.filter(id=self.user.id)
        self.assertTrue(all_users_in_db.exists())  

    def test_recover(self):
        """Testa se a recuperação de um soft delete está funcionando corretamente"""
        self.user.delete()
        self.user.recover()
        self.user.refresh_from_db()

        self.assertTrue(self.user.is_active)
        self.assertIsNone(self.user.deleted_at)

        users = CustomUser.objects.filter(is_active=True)
        self.assertIn(self.user, users)

    def test_hard_delete(self):
        """Testa se o hard delete remove o objeto do banco de dados permanentemente"""
        user_id = self.user.id
        self.user.hard_delete()

        with self.assertRaises(CustomUser.DoesNotExist):
            CustomUser.objects.get(id=user_id)

    def test_hard_delete_preserves_other_users(self):
        """Testa se o hard delete de um usuário não afeta outros usuários no banco de dados"""
        other_user = CustomUser.objects.create_user(
            username="testuser2",
            email="testuser2@example.com",
            password="password123",
            phone="987654321"
        )
        self.user.hard_delete()

        other_user.refresh_from_db()
        self.assertIsNotNone(other_user)

    def test_cannot_create_duplicate_email(self):
        """Testa se não é possível criar um usuário com e-mails duplicados"""
        with self.assertRaises(IntegrityError):
            CustomUser.objects.create_user(
                username="anotheruser",
                email="testuser@gmail.com",
                password="password123",
                phone="999999999"
            )
            