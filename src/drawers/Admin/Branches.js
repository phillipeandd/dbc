import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import AdminFooter from "../../screens/Footer/AdminFooter";
const Branches = ({navigation}) => {
    const { userId } = useAuth();
    const [branchesCount, setBranchesCount] = useState("");
    //console.log("branchesCount", branchesCount);
    const [isLoading, setIsLoading] = useState(false);
    const fetchBranchesCount = useCallback(() => {
        setIsLoading(true);
        const apiUrl = `https://bc.exploreanddo.com/api/company-branches/${userId}`;
        axios
            .get(apiUrl)
            .then((response) => {
                setBranchesCount(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }, [userId]);

    useEffect(() => {
        fetchBranchesCount();
    }, [fetchBranchesCount]);
    return (
        <View
            style={{
                backgroundColor: "white",
                padding: 20,
            }}
        >
            <ScrollView >
                {branchesCount &&
                    branchesCount.branches.map((branch, index) => (
                        <View key={index}>
                            <View
                                style={[
                                    styles.branchContainer,
                                    index % 2 === 0
                                        ? styles.skyBackground
                                        : styles.oliveBackground,
                                ]}
                            >
                                <Text
                                    style={{ fontWeight: "bold", color: "#8339FF" }}
                                >
                                    Branch Name: {branch.branch_name}
                                </Text>
                                <Text>Email: {branch.email}</Text>
                                <Text>Address: {branch.address}</Text>
                                <Text>Phone: {branch.phone}</Text>
                            </View>
                            {index !== branchesCount.branches.length - 1 && (
                                <View style={styles.separator} />
                            )}
                        </View>
                    ))}
            </ScrollView>
            <AdminFooter navigation={navigation} />
        </View>
    )
}

export default Branches

const styles = StyleSheet.create({
    branchContainer: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
    },
    skyBackground: {
        backgroundColor: "#EDDFFF",
    },
    oliveBackground: {
        backgroundColor: "#EDCDFF",
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: "#EDCDFF",
        // borderStyle: "dashed",
        marginHorizontal: 10,
        margin: 10,
    },
})