import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { useEffect, useState } from 'react';
import FormatNumber from "./FormatNumber";

const SearchArea = (props) => {
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [modalPhoto, setModalPhoto] = useState(false);
    const [form, setForm] = useState();

  useEffect(() => {
    setData(props.products);
  },[]);

  const mostrarModalPhoto = (productImg) => {
    setModalPhoto(true);
    setForm(productImg);
  };

  const cerrarModalPhoto = () => {
    setModalPhoto(false);
  };

  const hardCodedDelete = (productId) => {
      let newListOfProducts = data.filter(product => productId !== product.id);
    setData(newListOfProducts);
  }

  const hardCodedCreate = (newProduct) => {
    setData([
        newProduct,
        ...data
    ]);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let filterProducts = props.products.filter(dato => dato.description.toLowerCase().includes(keyword.toLowerCase()));
    setData(filterProducts);
  }

  return (
    <>
      <Container>
      <br />
      {/* SearchForm */}
            <div className="search-area">
                <form
                onSubmit={submitHandler}
                >
                <label htmlFor="keyword">
                Search
                <input
                    id="keyword"
                    value={keyword}
                    placeholder="Search Keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                </label>
                <button>Submit</button>
            </form>
            </div>
        {/* end SearchForm */}
        <Button color="success" onClick={() => {hardCodedCreate({
              id: 500,
              name: "Coder Wine - Edición Especial",
              stock: 10,
              cost: 169,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor libero, tincidunt id lacinia auctor, mattis elementum tortor. In eu bibendum magna, ac dignissim justo.",          
              image: ["https://res.cloudinary.com/hdsqazxtw/image/upload/v1600707758/coderhouse-logo.png"]
        })}}>Crear Coder Wine (Hard Coded)</Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {data.map(dato => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.name}</td>
                <td>{dato.description}</td>
                <td>{dato.stock}</td>
                <td><FormatNumber number={dato.cost} /></td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => mostrarModalPhoto(dato.image[0])}
                  >
                    Ver Foto
                  </Button>{" "}
                  <Button color="danger" onClick={() => hardCodedDelete(dato.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={modalPhoto}>
        <ModalHeader>
         <div><h3>Foto del producto</h3></div>
        </ModalHeader>

        <ModalBody>
          <img src={form} width="300" alt="Product image" />
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            onClick={cerrarModalPhoto}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default SearchArea;