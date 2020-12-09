import { connect } from 'react-redux';
import OrderScreen from './OrderScreen';
import * as OrderScreenActions from '../../redux/action/OrderScreenActions'

export default connect(
    ({ user, order }) => ({
        successAck: user.successAck,
        errorMessage: user.errorMessage,
        token: order.token
    }),
    dispatch => ({
  


        getOrders: () => {
            dispatch(OrderScreenActions.getOrdersToken())
                // .then(() =>   dispatch(OrderScreenActions.getOrdersDetails()))
                .catch(() => { });
        },



    }),
)(OrderScreen);
