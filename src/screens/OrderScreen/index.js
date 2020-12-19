import { connect } from 'react-redux';
import OrderScreen from './OrderScreen';
import * as OrderScreenActions from '../../redux/action/OrderScreenActions'

export default connect(
    ({ order }) => ({
        pendingOrders: order.pendingOrders,
        isLoadingOrders: order.isLoadingOrders
    }),
    dispatch => ({
        getOrders: () => {
            dispatch(OrderScreenActions.getOrdersToken())
                .catch(() => { });
        },
    }),
)(OrderScreen);
