import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import MenuGroup from '../components/MenuGroup'
import Button from '../components/Button'
import { StyleSheet, css } from "aphrodite";
import { Modal, ButtonGroup} from 'react-bootstrap'
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';

// import { ToggleOffOutlinedIcon, ToggleOnIcon } from '@material-ui/icons'

const styles = StyleSheet.create({
  main: {
  display: 'flex',
},
  menu:{
    width:'60%'
  },
  resumo: {
    width: '40%',
    textAlign:'center',
  } 
});

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [resumo, setResumo] = useState([]);
  const [showModal, setshowModal] = useState(false);

  const handleClose = () => setshowModal(false);
  const handleShow = () => setshowModal(true);

  let newResumo = [];

  const addHamb = (e) => {
    handleShow()
    console.log('show modal')
    console.log('verificar se tem o item no resumo')
    console.log('add item no resumo')
  }

  const addItem = (e) => {
    const itemAdded = e.currentTarget.innerHTML
    const hasItem = resumo.some( item => item['item'] === itemAdded )
    checkHasItemOrdered(hasItem, itemAdded)
  }
  const checkHasItemOrdered = (hasItem, itemAdded) => {
    if (hasItem) {
      newResumo = resumo.map((item) => {
          if(item.item === itemAdded) {
            item.quantia += 1
            return item
        } else {
          return item
        }
      })
    } else {
      newResumo = [...resumo, {item: itemAdded, quantia: 1 }]
      }
      setResumo(newResumo)
  }

  useEffect(()=>{
    console.log(resumo)
  },[resumo])

  useEffect(() => {
    firebase
      .firestore()
      .collection("MENU")
      .get()
      .then(querySnapshot => {
        const products = querySnapshot.docs.map(doc => {
          return doc.data();
        });
        setMenu(products);
      });
  }, []);

  function ShowHamburguerOptionModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>OPÇÕES DE HAMBURGUER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ButtonGroup aria-label="First group">
              <Button title ={'Bovino'} />
              <Button title ={'Frango'} />
              <Button title ={'Vegetariano'} />
            </ButtonGroup>
            <section>
              <p>ADICIONAL POR R$ 1,00</p>
              <p>ADICIONAL QUEIJO <ToggleOffOutlinedIcon onClick={()=> console.log('click')}/></p> 
              <p>ADICIONAL OVO <ToggleOffOutlinedIcon onClick={console.log('click')}/></p>
            </section>
        </Modal.Body>
        <Modal.Footer>
          <Button title="Cancelar" onClick={handleClose}>
            Close
          </Button>
          <Button title="OK" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <main className={css(styles.main)}>
      <section className={css(styles.menu)}>
        <MenuGroup title="Café da Manhã" type="breakfast" menu={menu} click={(e)=> addItem(e)} />
        <MenuGroup title="Hamburgueres" type="hamburguer" menu={menu} click={(e)=> addHamb(e)} />
        <MenuGroup title="Acompanhamentos" type="side-dishes" menu={menu} click={(e)=> addItem(e)} />
        <MenuGroup title="Bebidas" type="beverages" menu={menu} click={(e)=> addItem(e)} />
      </section>
      <section className={css(styles.resumo)} id="order">
        <h4>Resumo</h4>
        <section>
          {/* { resumo.map(itemOrder => {
            return <section>{itemOrder}</section>
          })} */}
        </section>
      </section>
      <ShowHamburguerOptionModal
        show={showModal}
        onHide={handleClose}
        animation={false}
      />
    </main>
  );
};

export default Menu;
