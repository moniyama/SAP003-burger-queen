import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import MenuGroup from '../components/MenuGroup'
import Button from '../components/Button'
import { StyleSheet, css } from "aphrodite";
import { Modal } from 'react-bootstrap'
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleIcon from "../components/ToggleIcon";

// import { ToggleOffOutlinedIcon, ToggleOnIcon } from '@material-ui/icons'

const styles = StyleSheet.create({
  main: {
    padding:'3%',
    display: 'flex',
},
  menu:{
    width:'60%'
  },
  resumo: {
    width: '40%',
    textAlign:'center',
  },
  modal:{
    textAlign:'center'
  },
  modalButtonsOptions: {
    display:'flex',
    justifyContent:'space-evenly',
  },
  modalAditional: {
    marginTop:'15px',
  },
  modalAditionalItens: {
    backgroundColor:'beige',
    fontSize:'large'
  },

});

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [resumo, setResumo] = useState([]);
  const [showModal, setshowModal] = useState(false);

  const handleClose = () => setshowModal(false);

  let newResumo = [];

  const addHamb = (e) => {
    handleClose()
    const itemAdded = 'hamburguer'
    const hasItem = resumo.some( item => item['item'] === itemAdded )
    checkHasItemOrdered(hasItem, itemAdded)
    console.log('verificar se tem o item no resumo')
    console.log('add item no resumo')
  }

useEffect(()=> {
  console.log('modal', showModal)
},[showModal])

useEffect(()=>{
  console.log('resumo', resumo)
},[resumo])

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

  function HamburguerOptionModalHtml(props) {
    return (
      <Modal className={css(styles.modal)}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>OPÇÕES DE HAMBURGUER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            < section className={css(styles.modalButtonsOptions)} aria-label="First group">
              <Button title ={'Bovino'} />
              <Button title ={'Frango'} />
              <Button title ={'Vegetariano'} />
            </section>
            <section className={css(styles.modalAditional)}>
              <h4>ADICIONAL POR R$ 1,00</h4>
              <section className={css(styles.modalAditionalItens)}>
                <ToggleIcon title={'ADICIONAL QUEIJO'}/>
                <ToggleIcon title={'ADICIONAL OVO'}/>
              </section>
            </section>
        </Modal.Body>
        <Modal.Footer>
          <Button title="Cancelar" handleClick={ () => setshowModal(false) } />
          <Button title="OK" handleClick={() => addHamb()} />
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <main className={css(styles.main)}>
      <section className={css(styles.menu)}>
        <MenuGroup title="Café da Manhã" type="breakfast" menu={menu} click={(e)=> addItem(e)} />
        <MenuGroup title="Hamburgueres" type="hamburguer" menu={menu} click={ () => setshowModal(true) } />
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
      <HamburguerOptionModalHtml
        show={showModal}
        onHide={handleClose}
        animation={false}
      />
    </main>
  );
};

export default Menu;
