import { connect } from 'react-redux';
import MapScreen from './MapScreen';
import * as OrderScreenActions from '../../redux/action/OrderScreenActions'

export default connect(
    ({ user, order }) => ({
        successAck: user.successAck,
        errorMessage: user.errorMessage,
        token: order.token
    }),
    dispatch => ({
        sendNotification: (locationDetails) => {
            dispatch(OrderScreenActions.sendNotification(locationDetails))
                .catch(() => { });
        },
    }),
)(MapScreen);
