import React from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import {
    Page,
    Text,
    Image,
    Document,
    StyleSheet,
    Font,
    View,
} from "@react-pdf/renderer";
import MyCustomFont from "../../../fonts/Anton-Regular.ttf";

Font.register({
    family: "AntonFamily",
    src: MyCustomFont,
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF", // Change this to match your color
        padding: 40,
    },
    section: {
        marginBottom: 20,
    },
    text: {
        fontSize: 12,

    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
        fontFamily: "AntonFamily",
    },
    addressSection: {
        flexDirection: "row",
    },
    addressColumn: {
        width: "50%",
    },
    addressText: {
        marginBottom: 8,
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 5,
    },
    table: {
        width: "100%",
        display: "table",
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
        borderBottom: 1,
        borderBottomColor: "#000",
        borderBottomStyle: "solid",
    },
    tableCell: {
        width: "20%",
        display: "table-cell",
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});

const AddressBlock = ({ title, content }) => (
    <View style={styles.addressColumn}>
        <Text style={styles.text}>
            <Text style={{ fontWeight: "bold", fontFamily: "AntonFamily" }}>{title}{'\n\n'}</Text>
            {content.split('\n\n').map((line, i) => (
                <Text key={i}>{line}</Text>
            ))}
        </Text>
    </View>
);

const PDFFile = ({ user, delivery }) => {


    return (
        <Document>

            <Page size="A4" style={styles.page}>
                <Text style={styles.header} fixed></Text>
                <Image
                    style={styles.image}
                    src="http://localhost:3000/assets/img/GrandImperialGroupLogoHeader.png"
                />

                <View style={styles.section}>
                    <View style={styles.addressSection}>
                        <AddressBlock
                            title="From:"
                            content="Grand Imperial Group"
                        />
                    </View>


                </View>
                <View style={styles.section}>
                    <View style={styles.addressSection}>

                        <AddressBlock
                            title="Has Prove That:"
                            content={user.name + " , " + user.email + " has completed delivering following item:"}
                        />
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text style={styles.text}>Order_ID</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.text}>Order_Date</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.text}>Delivery To</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.text}>Recipient's Name</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.text}>Recipient's Phone</Text>
                        </View>
                    </View>
                    {delivery.map((item, i) => (
                        <View style={styles.tableRow} key={i}>
                            <View style={styles.tableCell}>
                                <Text style={styles.text}>OD{item.order_id}#</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.text}>{item.order.order_date}</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.text}>{item.street}, {item.city}, {item.postcode} {item.state}.</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.text}>{item.username}</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.text}>{item.userphone}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <Text style={{ ...styles.text, fontFamily: "AntonFamily", marginTop: 30 }}>
                    Director Of Grand Imperial Group:
                </Text>
                <Image
                    src="http://localhost:3000/assets/img/signature.jpg"
                    style={{ width: 100, height: 50, marginTop: 10 }}
                />
            </Page>

        </Document>
    );
};

export default PDFFile;
