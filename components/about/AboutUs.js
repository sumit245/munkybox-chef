import { View, Text, ScrollView } from 'react-native'
import React from 'react'

export default function AboutUs() {
    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ backgroundColor: "#fff", padding: 4, marginHorizontal: 2 }}>
            <Text style={{ textAlign: "center", textTransform: "uppercase", color: "#2246cf", padding: 18 }}>Privacy policy</Text>
            <Text style={{ lineHeight: 24, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>SECTION 1 - INFORMATION{"\n"}</Text>
                1.1. When you purchase something from our app or website, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.{"\n"}
                1.2. When you browse our app or website, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.{"\n"}
                1.3. With your permission, we may send you emails about our new products and other updates.{"\n"}
                <Text style={{ fontWeight: "bold" }}>SECTION 2 - CONSENT{"\n"}</Text>
                2.1. When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.{"\n"}
                2.2. If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.{"\n"}
                2.3. If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by writing to us at <Text style={{ textDecorationLine: "underline", color: "#226ccf" }}>support@feasti.com{"\n"}</Text>
                <Text style={{ fontWeight: "bold" }}>SECTION 3 – DISCLOSURE{"\n"}</Text>
                3.1. We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.{"\n"}
                <Text style={{ fontWeight: "bold" }}>SECTION 4 - PAYMENT{"\n"}</Text>
                4.1. We use Stripe for processing payments. We/Stripe do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.{"\n"}
                4.2. Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.{"\n"}
                4.3. PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.{"\n"}
                For more insight, you may also want to read terms and conditions of Stripe on https://stripe.com{"\n"}
                <Text style={{ fontWeight: "bold" }}>SECTION 5 - THIRD-PARTY SERVICES{"\n"}</Text>
                5.1. In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.{"\n"}
                5.2. However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions. For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.{"\n"}
                5.3. In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.{"\n"}
                5.4. Once you leave our website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.{"\n"}
                5.5. When you click on links on our website, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.{"\n"}
                <Text style={{ fontWeight: "bold" }}>SECTION 6 - SECURITY{"\n"}</Text>
                6.1. To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.{"\n"}
                <Text style={{ fontWeight: "bold" }}>SECTION 7 - COOKIES{"\n"}</Text>
                7.1. We use cookies to maintain session of your user. It is not used to personally identify you on other websites{"\n"}
                <Text style={{ fontWeight: "bold" }}>SECTION 8 - AGE OF CONSENT{"\n"}</Text>
                8.1. By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.{"\n"}
                <Text style={{ fontWeight: "bold" }}>SECTION 9 - CHANGES TO THIS PRIVACY POLICY{"\n"}</Text>
                9.1. We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.{"\n"}
                9.2. If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.{"\n"}
                <Text style={{ fontWeight: "bold" }}>SECTION 10: COMPLAINTS{"\n"}</Text>
                10.1. If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information, email us at <Text style={{ textDecorationLine: "underline", color: "#226ccf" }}>support@feasti.com{"\n"}</Text>


            </Text>
        </ScrollView>
    )
}