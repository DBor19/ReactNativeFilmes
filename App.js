import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function App() {

  const [filmes, setFilmes] = useState([])
  const [genero, setGenero] = useState('')
  const [visivel, setVisivel] = useState(false)

  async function buscar(){

    try {
      const resposta = await axios.get('http://192.168.15.10:3000/filmes')
      // console.log(resposta.data)

      if (resposta.data && resposta.data.length > 0) {
        const todosOsFilmes = resposta.data[0]
        // console.log(todosOsFilmes)

        const filmesFiltrados = resposta.data.filter(filme => {
          return filme.Genre.split(', ').map(gen => gen.toLowerCase()).includes(genero);
        });
        setFilmes(filmesFiltrados)

      }
      
    } catch (error) {
      console.log("Erro: " + error)
    }

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gênero de Filmes</Text>

      <TextInput 
        style={styles.inputBox}
        placeholder='informe o gênero'
        value={genero}
        onChangeText={(text) => {setGenero(text.toLocaleLowerCase())}}
      />
      
      <Button 
        title='Procurar'
        onPress={() => {
          buscar()
          setVisivel(!visivel)
        }}
      />


      <Modal
        transparent={true}
        animationType='fade'
        visible={visivel}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <FlatList 
              data={filmes}
              keyExtractor={item => item.Title}
              renderItem={({ item }) => (
                <>
                  <Text>{item.Title}</Text>
                </>
              )}
            />

            <Button 
              title='Fechar'
              onPress={() => setVisivel(!visivel)}
            />
          </View>
        </View>
      </Modal>



      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox:{
    backgroundColor: '#D1D19E',
    height: 40,
    width:200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    padding: 20,
    width: 200,
    maxHeight: '80%',
  },
});
