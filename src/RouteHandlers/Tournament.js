import React, { Component } from 'react'
import Promise from 'bluebird'

//УДАЛИТЬ!!!!!
let config = {
    apis: {
        ss2: 'http://ss2.tjekscores.dk/'
    }
};

export default class Tournament extends Component {
    state = {
        tournament: {}
    };

    componentDidMount() {
        Promise.props({
            tournament: fetch(`${config.apis.ss2}/tournaments/${this.props.params.tournamentId}`).then(response => response.json())

        }).then(res => {
            this.setState({
                tournament: res.tournament
            });

        });
    }

    render() {
        const { tournament } = this.state;

        console.log( '---', 'state', this.state );

        return (
            <div>
                <h2>{tournament.name}</h2>
                {this.props.params.tournamentId}
            </div>
        );
    }
}