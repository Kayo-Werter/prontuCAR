import requests


class ViaCep:

    def __init__(self):
        self.__base_url = 'https://viacep.com.br/ws/'
       
    
    def consulta_cep(self, cep):
        try:
            response = requests.get(
                url=f'{self.__base_url}{cep}/json/'
            ) 
            response.raise_for_status()
            return response.json()

        except requests.exceptions.RequestException as e:
            return {f"error: Erro ao acessar o serviço ViaCep: {e}"}
