import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import moment from 'moment'
import NumberFormat from 'react-number-format';

export default class OrderScreen extends React.Component {
    componentDidMount() {
        this.props.getOrders()
    }

    onNavigateToMap = () => {
        this.props.navigation.navigate("MapScreen")
    }

    renderDivider = () => {
        return (
            <View
                style={styles.summaryDivider} />
        )
    }

    renderPendingOrder = ({ item }) => {
        const {
            grand_total,
            increment_id,
            items,
            mobile_number,
            name,
            payment_status,
            pickup_date,
            pickup_time
        } = item
        return (
            <TouchableOpacity
                onPress={this.onNavigateToMap}
                style={styles.cardContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '65%' }}>
                        <Text style={styles.custmerName}>
                            {name}
                        </Text>
                        <Text style={styles.custmerPhone}>
                            {mobile_number}
                        </Text>
                    </View>
                    <View style={styles.customerId}>
                        <Text style={{ textAlign: 'right', marginRight: 18 }}>
                            {`# ${increment_id}`}
                        </Text>
                    </View>
                </View>
                <View style={styles.orderPriceBack}>
                    <NumberFormat value={grand_total} displayType={'text'} thousandSeparator={true} prefix={'₹ '} decimalScale={2} renderText={value =>
                        <Text style={styles.orderPriceValueÎ}>
                            {value}
                        </Text>} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 13 }}>
                    <View style={styles.orderSummary}>
                        <View>
                            <Text style={{ fontWeight: '600', fontSize: 15 }}>
                                {moment(pickup_date).format('DD MMM')}
                            </Text>
                            <Text style={styles.orderField}>
                                PICK UP DATE
                            </Text>
                        </View>
                        {this.renderDivider()}
                        <View>
                            <Text>
                                {moment(pickup_time, 'hh:mm A').format('hh:mm A')}
                            </Text>
                            <Text style={styles.orderField}>
                                PICK UP TIME
                            </Text>
                        </View>
                        {this.renderDivider()}
                        <View>
                            <Text>
                                {items < 10 ? `0${items}` : items}
                            </Text>
                            <Text style={styles.orderField}>
                                ITEMS
                            </Text>
                        </View>
                    </View>

                    <View style={{ width: '35%', marginLeft: 20 }}>
                        <View>
                            <Text style={styles.paymentStatus}>
                                {payment_status.toUpperCase()}
                            </Text>
                            <Text style={styles.paymetField}>
                                PAYMENT STATUS
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        )

    }

    flatListItemSeparator = (item) => {
        return (
            <View>
                <Text style={styles.saparatorText}>
                    {`Received ${item?.leadingItem?.order_date}`}
                </Text>
            </View>
        )
    }

    renderEmptyComponent = () => {
        return (
            <View style={styles.emptyViewContainer}>
                <Text style={styles.emptyText}>
                    No Pending Orders Found
            </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: '#e3e3e3', flex: 1 }}>
                {this.props.isLoadingOrders ?
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <ActivityIndicator size="large" color="blue" style={{ alignSelf: 'center' }} />
                    </View> :
                    <FlatList
                        data={this.props.pendingOrders.order_data}
                        renderItem={this.renderPendingOrder}
                        ItemSeparatorComponent={this.flatListItemSeparator}
                        ListEmptyComponent={this.renderEmptyComponent}
                        initialNumToRender={15}
                        keyExtractor={(item, index) => index.toString()} />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: { margin: 15, backgroundColor: `#ffffff`, borderRadius: 10, padding: 20 },
    custmerName: { fontWeight: 'bold', fontSize: 16, paddingBottom: 5 },
    custmerPhone: { fontWeight: '600', fontSize: 15 },
    customerId: { width: '35%', marginLeft: 20, marginTop: 5 },
    orderPriceBack: { backgroundColor: 'rgba(0,106,78,0.2)', width: '28%', padding: 7, alignSelf: 'flex-end', borderRadius: 10, marginLeft: 10 },
    orderPriceValue: { textAlign: 'center', color: 'rgb(0,106,78)', fontWeight: 'bold' },
    orderSummary: { width: '65%', flexDirection: 'row', justifyContent: 'space-between' },
    orderField: { fontSize: 11, color: '#A9A9A9' },
    paymentStatus: { textAlign: 'right', marginRight: 18, color: 'rgb(0,106,78)' },
    paymetField: { fontSize: 11, color: '#A9A9A9', textAlign: 'right', marginRight: 18 },
    summaryDivider: { borderLeftWidth: 1, borderLeftColor: '#A9A9A9', height: '50%', alignSelf: 'center' },
    saparatorText: { alignSelf: 'flex-end', fontSize: 10, marginRight: 20 },
    emptyViewContainer: { flex: 1, justifyContent: 'center' },
    emptyText: { fontSize: 25, color: 'blue', alignSelf: 'center' }
});