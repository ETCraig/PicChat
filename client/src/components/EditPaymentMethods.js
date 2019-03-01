import React, { Component } from 'react';

import AddPaymentMethod from '../containers/AddPaymentMethod';
import {capitalize} from '../utils/Capitalize';
import { Elements } from 'react-stripe-elements';
import { getPaymentMethods } from '../services/Stripe.Services';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100%;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  font-family: roboto;
  .bigIcon {
    font-size: 30px;
  }
`;
const MainColumn = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;
const OptionGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const PaymentOption = styled.div`
  height: 50px;
  background-color: #f2f2f2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  align-self: center;
  width: 100%;
  padding: 4px 30px 4px 30px;
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
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

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
        if (!this.state.modal) {
            return (
                <div />
            );
        } else {
            return (
                <Elements>
                    <AddPaymentMethod />
                </Elements>
            )
        }
    }
    currentModal() {
        this.setState({ modal: true });
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
                        {paymentMethods.length ? paymentMethods.map((source, index) => (
                            <PaymentOption key={index}>
                                <InfoContainer>
                                    <InfoLast>
                                        {capitalize(source.card.funding)} **{source.card.last4}
                                    </InfoLast>
                                    <InfoExp>
                                        {source.card.exp_month}/
                                        {source.card.exp_year.toString().substr(2, 2)}
                                    </InfoExp>
                                </InfoContainer>
                            </PaymentOption>
                        )) :
                            <div>
                                <p>No credit or debit cards on file.</p>
                            </div>}
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