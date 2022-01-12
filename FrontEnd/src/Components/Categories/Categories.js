import React, { Component } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";

import "./Categories.css"

import Cards from "./Cards"
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default class Categories extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        axios.get("http://localhost:3001/api/data").then(res => {
            const data = res.data;
            this.setState({ data });
        })
    }

    delete(name) {
        axios.post("http://localhost:3001/api/categories/rem", {name: name}).then(() => {
            var tmp = this.state.data;
            tmp.splice(this.state.data.indexOf(this.state.data.find((o) => o.name == name)), 1);
            this.setState({data: tmp});
        });
    }

    keyPress(e) {
        if(e.key === "Enter" && e.target.value != "") {
            axios.post("http://localhost:3001/api/categories/add", {name: e.target.value,}).then(() => {
                var tmp = this.state.data;
                tmp.push({name: e.target.value, items: []});
                this.setState({data: tmp});
                e.target.value = "";
            }).catch(e => {throw e});
        }
    }

    render() {
        return (<>
            <div className="button">
                <TextField
                    label="New Category"
                    InputProps={{ startAdornment: (<InputAdornment position="start"><AddIcon /></InputAdornment>),}}
                    variant="outlined"
                    style={{ minWidth: "25rem" }}
                    onKeyDown={this.keyPress.bind(this)}
                />
            </div>
            <div className="container">
                <Grid container spacing={2}>
                    {this.state.data.map((d, index) => {
                        return (
                            <Grid item xs={12} sm={4} key={"Category" + index}>
                                <Card>
                                    <CardContent>
                                        <Cards category={d.name} data={d.items} />
                                        <Button variant="outlined" startIcon={<DeleteIcon />} style={{ marginTop: "2rem", marginBottom: "1rem", float: "right"}} onClick={() => this.delete(d.name)} >Delete Category</Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </>);
    }
}