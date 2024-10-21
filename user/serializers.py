from rest_framework import serializers
from user.models import CustomUser, Address
from services.viacep import ViaCep


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']


class CustomUserSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone', 'password', 'address']


    def create(self, validated_data):
        address_data = validated_data.pop('address')

        cep = address_data.get('cep')

        via_cep_service = ViaCep()
        via_cep_data = via_cep_service.consulta_cep(cep)

        if 'error' not in via_cep_data:
            address_data.update({
                'street': via_cep_data.get('logradouro', ''),
                'neighborhood': via_cep_data.get('bairro', ''),
                'city': via_cep_data.get('localidade', ''),
                'state': via_cep_data.get('uf', '')
                })

        address = Address.objects.create(**address_data)
        user = CustomUser(address=address, **validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
