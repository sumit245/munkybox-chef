import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import { SecondaryDarkColor } from '../../Colors';
import { width } from '../../Dimens';
export default class PlanDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props
        }
    }
    render() {
        const { fifteenPlan, twoPlan, thirtyPlan } = this.state
        return (
            <>
                <Card style={styles.container} >
                    <Card.Title title="2 Days" />
                    <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: "#777", fontSize: 20 }} >Your price for</Text>
                            <Text style={{ color: "#444", fontSize: 24 }}> 2 Days Plan </Text>
                            <Text style={{ color: "#777", fontSize: 20 }}>meal is</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{twoPlan.base_2price}</Text>
                        </View>
                    </Card.Content>
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.container} >
                    <Card.Title title="15 Days" />
                    <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{fifteenPlan.base_15price}</Text>
                        </View>
                    </Card.Content>
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.container} >
                    <Card.Title title="30 Days" />
                    <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{thirtyPlan.base_30price}</Text>
                        </View>
                    </Card.Content>
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: '96%',
        marginHorizontal: '2%',
        marginVertical: '1%'
    },
    priceContainer: {
        height: width / 4,
        width: width / 4,
        elevation: 2,
        borderColor: "rgba(150,150,25,0.2)",
        borderWidth: 1,
        borderRadius: width / 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: SecondaryDarkColor
    },
    price: {
        fontSize: 32,
        color: "#fff"
    }
})
