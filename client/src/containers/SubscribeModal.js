import React, {Component} from 'react';
// import {addCard} from '../services/Stripe.Services';
import AddPaymentModal from './AddPaymentModal';
import {capitalize} from '../utils/Capitalize';
// import {
//     Elements,
//     injectStripe,
//     CardNumberElement,
//     CardExpiryElement,
//     CardCVCElement,
//     PostalCodeElement
// } from 'react-stripe-elements';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import {Elements} from 'react-stripe-elements';
import {
    getPaymentMethods, 
    subscribeToCreator
} from '../services/Stripe.Services';
import {Radio} from '@material-ui/core'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100%;
  align-content: center;
  width: 100%;
  height: 100%;
  font-family: roboto;

  .bigIcon {
    font-size: 30px;
  }
`;
const PaymentStuff = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100%;
  align-content: center;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;
const OptionGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const CardOption = styled.div`
  height: 50px;
  background-color: #f2f2f2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  align-self: center;
  width: 100%;
  padding: 25px 30px 25px 30px;
  margin-bottom: 10px;

  .brand {
    display: flex;
    span {
      display: flex;
      width: 40px;
      height: 20px;
      border: 1px solid rgb(101, 101, 101);
      margin-right: 20px;
      background-color: rgb(255, 255, 255);
      font-size: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .expires {
    width: 200px;
    align-items: left;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  justify-content: space-between;
`;
const InfoLast = styled.p`
  font-size: 15px;
  font-weight: 500;
  /* text-transform: uppercase; */
  text-decoration: none;
  color: #828282;
  margin-left: 20px;
  margin-top: 15px;
`;

const InfoExp = styled.p`
  font-size: 15px;
  font-weight: 500;
  /* text-transform: uppercase; */
  text-decoration: none;
  color: #828282;

  margin-top: 15px;
`;

class SubscribeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: true,
            cards: [],
            selected: [],
            creator: this.props.creator,
            add: false
        }
        this.addPaymentMethod = this.addPaymentMethod.bind(this);
        this.handleAddModal = this.handleAddModal.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.handleSubscribe = this.handleSubscribe.bind(this);
    }
    componentDidMount() {
        getPaymentMethods()
            .then(({status, data}) => {
                if(status === 200) {
                    if(data.data.length) {
                        this.setState({cards: data.data});
                        console.log(this.state.cards)
                        this.setState({selected: data.data[0].id});
                        console.log(this.state.selected)
                        console.log(this.state.creator)
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    handleRadio(e) {
        this.setState({selected: e.target.value});
        console.log(this.state.selected);
    }
    handleAddModal() {
        if(!this.state.add) {
            return(
                <div/>
            )
        } else {
            return(
                <Elements>
                    <AddPaymentModal />
                </Elements>
            );
        }
    }
    addPaymentMethod() {
        this.setState({add: true})
    }
    handleSubscribe() {
        let sourceId = this.state.selected;
        let creatorId = this.state.creator;
        subscribeToCreator(sourceId, creatorId)
            .then(({status, data}) => {
                if(status === 200) {
                    this.setState({modal: false})
                } else {
                    console.log('Err.');
                }
            });
    }
    render() {
        let cardList = this.state.cards;
        return(
            <Modal
                isOpen={this.state.modal}
                style={{marginTop: '100px'}}
            >
                <ModalBody>
                    <Container>
                        <ModalHeader>Subscribe</ModalHeader>
                        <PaymentStuff>
                            <OptionGrid>
                                {cardList.length ? (
                                    cardList.map((source, i) => (
                                        <CardOption key={i}>
                                            <Radio 
                                                checked={this.state.selected == source.id}
                                                value={source.id}
                                                onChange={this.handleRadio}
                                                color='primary'
                                            />
                                            <InfoContainer>
                                                <InfoLast>
                                                    {capitalize(source.card.funding)} **
                                                    {source.card.last4}
                                                </InfoLast>
                                                <InfoExp>
                                                    {source.card.exp_month}/ 
                                                    {source.card.exp_year.toString().substr(2, 2)}
                                                </InfoExp>
                                            </InfoContainer>
                                        </CardOption>
                                    ))
                                ) : (
                                    <p>No Cards on File</p>
                                )}
                                <Button
                                    onClick={this.addPaymentMethod}
                                >
                                    Add Card
                                </Button>
                                <Button
                                    onClick={this.handleSubscribe}
                                >
                                    Subscribe
                                </Button>
                                {this.handleAddModal()}
                            </OptionGrid>
                        </PaymentStuff>
                    </Container>
                </ModalBody>
            </Modal>
        );
    }
}

export default SubscribeModal;