import React, { Component } from 'react'
import { Link } from 'react-router'
import Promise from 'bluebird'
const _ = require('lodash');

//УДАЛИТЬ!!!!!
let config = {
    apis: {
        ss2: 'http://ss2.tjekscores.dk/'
    }
};

const sportIdToName = {
    23: 'basketball',
    51: 'volleyball',
    33: 'badminton',
    20: 'handball',
    5: 'hockey',
    1: 'soccer'
};
const tournamentsToShow = {
    1: [46, 245, 282, 85, 239, 256, 242, 47, 48, 132, 133, 87, 138, 54, 146, 55, 141, 57, 53, 71, 67, 59, 42, 73, 77, 50, 9375, 76, 292],
    51: [8884, 8883],
    20: [352, 354, 358, 350, 348, 361, 363, 387, 353, 355, 359, 349, 362, 368, 364, 388],
    5: [311, 24, 21, 9436, 33],
    23: [391, 390, 392],
    33: [9079]
};
const mainTournamentsOrder = {
    1: [46, 47, 87, 54, 55, 42, 73]
};
const tournamentsCountriesOrder = {
    1: [1, 2, 8, 3, 4, 9, 5, 13, 6, 7, 11]
};

//вместо soccer будет реальный sport | this.props.params.sport
export default class Menu extends Component {
    state = {
        tournaments: []
    };

    componentDidMount() {
        Promise.props({
            tournaments: fetch(`${config.apis.ss2}/tournaments`).then(response => response.json())

        }).then(res => {
            this.setState({
                tournaments: res.tournaments
            });

        });
    }

    render() {
        // console.log( '---', 'props.params', this.props.params.tournamentId );
        // console.log( '---', 'props.params', this.props.params.sport );
        //console.log( '---', 'tournaments', this.state.tournaments );

        if (!this.props.params.tournamentId) return <div>{this.renderTournaments()}</div>;

        return <div>{this.props.children}</div>
    }

    getTournaments() {
        const { tournaments } = this.state;

        if (!tournaments.length) return null;

        let sportType = 'soccer';  //this.props.params.sport !!!
        let sportId = _.findKey(sportIdToName, name => name === sportType);
        let tournamentsBySportType = tournamentsToShow[sportId];

        return tournamentsBySportType.map((id) => {
            return tournaments.filter((tournament) => {
                return tournament.id === id;
            })[0];
        });
    }

    renderTournaments() {
        const { tournaments } = this.state;

        let sportType = 'soccer';  //this.props.params.sport !!!

        if (!tournaments.length) return null;

        let tournamentsList = this.getTournaments().map((tournament) => {
            const tournamentUrl = `/ids/${sportType}/tournament/${tournament.id}`;

            return (
                <li key={tournament.id}>
                    <Link to={tournamentUrl}>{tournament.id} {tournament.name}</Link>
                </li>
            );
        });

        return (
            <ul>{tournamentsList}</ul>
        );
    }
}