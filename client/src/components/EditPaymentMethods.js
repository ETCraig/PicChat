import React, { Component } from 'react';

import AddPaymentMethod from '../containers/AddPaymentMethod';
import {Elements} from 'react-stripe-elements';
import {getPaymentMethods} from '../services/Stripe.Services';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 24px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  display: flex;
  width: 100%;
  justify-content: center;
  color: rgb(101, 101, 101);
  background-color: rgb(255, 255, 255);
`
const MainColumn = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`
const OptionGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
    margin-bottom: 40px;
`

class EditPaymentMethods extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paymentMethods: [],
            modal: false
        }
        this.currentModal = this.currentModal.bind(this);
    }
    componentDidMount() {
        getPaymentMethods()
            .then(({ status, data: sourceData }) => {
                if (status === 200) {
                    let { data: paymentMethods } = sourceData;
                    this.setState({ paymentMethods });
                    console.log('paymentMethods', paymentMethods);
                }
            })
            .catch(err => {
                throw err;
            });
    }
    updateList = () => {
        getPaymentMethods()
            .then(({ status, data: sourceData }) => {
                if (status === 200) {
                    let { data: paymentMethods } = sourceData;
                    this.setState({ paymentMethods });
                    console.log('paymentMethods', paymentMethods);
                }
            })
            .catch(err => {
                throw err
            });
    }
    handleModal() {
        if(!this.state.modal) {
            return(
                <div />
            );
        } else {
            return(
                <Elements>
                    <AddPaymentMethod />
                </Elements>
            )
        }
    }
    currentModal() {
        this.setState({modal: true});
    }
    render() {
        let { paymentMethods } = this.state;
        // let { handlePaymentModal } = this.context;
        return (
            <Container>
                <MainColumn>
                    <h3>Payment Options</h3>
                    <p>An overview of your payment methods.</p>
                    <h5>Credits and Debits</h5>
                    <OptionGrid>
                        {/* {paymentMethods.length ? paymentMethods.map((source, index) => (
                            <PaymentOption key={index} source={source} updateListOfPaymentMethods={this.updateListOfPaymentMethods} />
                        )) :
                            <div>
                                <p>No credit or debit cards on file.</p>
                            </div>} */}
                    </OptionGrid>
                    <h5>Add a New Payment Method</h5>

                    <h5>Credit or Debit Cards</h5>
                    <p>SideCoach accepts all major credit and debit cards.</p>
                    <button onClick={this.currentModal}>Add a card</button>
                </MainColumn>
                {this.handleModal()}
            </Container>
        );
    }
}

export default EditPaymentMethods;