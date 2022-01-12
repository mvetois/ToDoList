import React, { Component } from "react";
import axios from "axios";

import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default class Cards extends Component {
    state = {
        data: []
    };
    componentDidMount() {
        this.setState({ data: this.props.data })
        window.addEventListener("customEvent", this.keyPress);
    }
    changeCkecked(name) {
        axios.post("http://localhost:3001/api/checked", {category: this.props.category, name: name});
    }
    delete(name) {
        axios.post("http://localhost:3001/api/items/rem", {category: this.props.category, name: name}).then(() => {
            var tmp = this.state.data;
            tmp.splice(this.state.data.indexOf(this.state.data.find((o) => o.name == name)), 1);
            this.setState({data: tmp});
        });
    }

    keyPress(e) {
        if(e.key === "Enter" && e.target.value != "") {
            axios.post("http://localhost:3001/api/items/add", {category: this.props.category, name: e.target.value}).then(() => {
                var tmp = this.state.data;
                tmp.push({name: e.target.value, checked: false});
                this.setState({data: tmp});
                e.target.value = "";
            }).catch(e => {throw e});
        }
    }

    render() {
        return (<>
            <Typography variant="h3">{this.props.category}</Typography>
            <br/>
            <Typography variant="body">
                <FormGroup>
                    {this.state.data.map((d, index) => {
                        return (
                            <>
                                <Stack direction="row" spacing={1} label={d.name}>
                                <IconButton aria-label="delete" onClick={() => this.delete(d.name)}><DeleteIcon /></IconButton>
                                <FormControlLabel control={d.checked ? <Checkbox defaultChecked onChange={() => this.changeCkecked(d.name) }/> : <Checkbox onChange={() => this.changeCkecked(d.name)} />} label={d.name} key={"ItemFrom" + d.name + index} />
                                </Stack>
                            </>
                        )
                    })}
                </FormGroup>
            </Typography>
            <br/>
            <TextField id="AddItem" label="Add Item to the list" variant="outlined" onKeyDown={this.keyPress.bind(this)} fullWidth />
        </>);
    }
}
