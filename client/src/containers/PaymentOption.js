import React, { Component } from 'react';

import {deletePaymentMethod} from '../services/Stripe.Services';
import styled from 'styled-components';

const PaymentOptionDiv = styled.div`

      height: 50px;
      background: rgb(232, 230, 231);
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 4px 30px 4px 30px;

      .brand {
        display: flex;
        span{
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
`

class PaymentOption extends Component {
    constructor(props) {
        super(props);
    }
    deleteCard = (sourceID) => {
        deletePaymentMethod(sourceID)
            .then(res => {
                if (res.status === 200) {
                    console.log('HIT FRONT');
                    this.props.updatePaymentMethods()
                }
            })
            .catch(err => {
                throw err
            });
    }
    render() {
        return (
            <PaymentOptionDiv>
                
            </PaymentOptionDiv>
        )
    }
}

export default PaymentOption;