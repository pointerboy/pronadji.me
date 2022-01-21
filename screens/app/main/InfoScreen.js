import React, {Component} from "react";

import {ScrollView, StyleSheet, Text, View,} from 'react-native';

import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import {Feather} from "@expo/vector-icons";

const pitanja = [
    {
        title: 'Kako da napravim objavu?',
        content: 'Kliknite na plus u gornjem desnom uglu i popunite sva polja.',
    },
    {
        title: 'Da li moram da okačim fotografiju na objavu?',
        content: 'Naravno da ne - opis i ime kao i lokacija su sasvim dovoljni.'
    },
    {
        title: 'Kako obrisati objavu?',
        content: 'Na kraju stranice možete pronaći ikonicu sa korpicom. Klikom na korpicu, Vaša objava se briše.',
    },
    {
        title: 'Da li je moj nalog anoniman drugim korisnicima?',
        content: 'Drugi korisnici mogu videti samo Vaš broj telefona. Korisničko ime kao i mejl su skriveni.',
    },
    {
        title: 'Da li mogu da obrišem svoj nalog?',
        content: 'Odlazeči u korisnička podešavanja, možete pristupiti procesu brisanja naloga. ',
    },
    {
        title: 'Ukraden mi je bicikl. Šta da radim?',
        content: 'Pored pravljena objave, preporučujemo odlazak u Centar Bezbjednosti i podnošenja zvanične prijave. ',
    },
    {
        title: 'Kako najbolje objaviti pronađenu stvar?',
        content: 'Ako je moguće, fotografišite predmet,  ili dajte dovoljno detaljan opis. Ne zaboravite da dodate lokaciju na kojoj ste pronašli predmet.',
    },
    {
        title: 'Šta ova platforma nije?',
        content: 'pronadji.me služi kao pomoć prilikom traženja ili objave pronađenih stvari, ona kao takva nije zamjena za bilo kakvu insituciju ' +
            'i ne može da se izjednači sa prijavama o nestalim/ukradenim predmetima. Platforma pronadji.me nije odgovorna za bilo kakvu štetu nanetu krajnjem korisniku.',
    },
];

export class InfoScreen extends Component {
    state = {
        activeSections: [],
        collapsed: true,
        multipleSelect: false,
    };

    toggleExpanded = () => {
        this.setState({collapsed: !this.state.collapsed});
    };

    setSections = (sections) => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Text style={styles.headerText}>{section.title}</Text>
            </Animatable.View>
        );
    };

    renderContent(section, _, isActive) {
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
                    {section.content}
                </Animatable.Text>
            </Animatable.View>
        );
    }

    render() {
        const {multipleSelect, activeSections} = this.state;

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{paddingTop: 10}}>
                    <Feather style={styles.logoImage} name={"book"} size={46}/>
                    <Text style={styles.title}>INFO CENTAR</Text>
                    <Accordion
                        activeSections={activeSections}
                        sections={pitanja}
                        expandMultiple={multipleSelect}
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
                        duration={400}
                        onChange={this.setSections}
                        renderAsFlatList={false}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: '300',
        marginBottom: 20,
    },
    logoImage: {
        textAlign: 'center'
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});

export default InfoScreen;

export const screenOptions = {
    headerShown: false,
};

