import React, { Component } from "react";
import { connect } from "react-redux";
import { addGame, editGame, deleteGame } from '../Redux/games';
import Modal from './Modal'
import '../Styles/Form.css';


class Form extends Component {
    constructor(props) {
        super(props);
        let { title, description, tags } = props;
        this.state = {
            inputs: {
                title: title || "",
                description: description || "",
                tags: tags || [false, false, false, false]
            },
            modalDisplay: false,
            displayForm: false
        }
    }
    handleChange(e) {
        let { value, checked, name, type } = e.target;
        this.setState(prevState => {
            let newTags = [...prevState.inputs.tags];
            if (type === "checkbox") {
                newTags[Number(name)] = checked;
                return {
                    inputs: {
                        ...prevState.inputs,
                        tags: newTags
                    }
                }
            } else {
                return {
                    inputs: {
                        ...prevState.inputs,
                        [name]: value
                    }
                }
            }
        })
    }

    toggleModal = () => {
        this.setState({
            modalDisplay: !this.state.modalDisplay
        })
    }

    clearInputs = e => {
        this.setState({
            inputs: {
                title: "",
                description: "",
                tags: [false, false, false, false]
            },
        });
    }



    handleSubmit = e => {
        e.preventDefault();
        var { editGame, addGame, add, _id } = this.props;
        if (add) {
            addGame(this.state.inputs);
            this.clearInputs(e);
        } else {
            editGame(this.state.inputs, _id);
            this.props.options.toggleDisplay();
        }
    }

    render() {
        let { title, description, tags } = this.state.inputs;
        return (
            <div>
                <div className="modal-wrapper" >
                    <button className='puppy' onClick={this.toggleModal}>Add new game</button>
                </div>
                <Modal show={this.state.modalDisplay} onClose={this.toggleModal}>
                    <form className='form-wrapper' onSubmit={this.handleSubmit}>
                        <div className='input-wrapper'>
                            <div className='title-wrapper'>
                                <input onChange={this.handleChange} value={title} name="title" type="text" placeholder="Title" />
                            </div>
                            <div className='description-wrapper'>
                                <textarea className='description-input' onChange={this.handleChange} value={description} name="description" type="text" placeholder="Description" />
                            </div>
                        </div>
                        <div className='game-options-wrapper'>
                            <div className="indoor-option">
                                <label>Indoor Games</label>
                                <input name="0" type="checkbox" checked={tags[0]} onChange={this.handleChange} />
                            </div>
                            <div className="outdoor-option">
                                <label>Outdoor Games</label>
                                <input name="1" type="checkbox" checked={tags[1]} onChange={this.handleChange} />
                            </div>
                            <div className="daytime-option">
                                <label>Daytime Games</label>
                                <input name="2" type="checkbox" checked={tags[2]} onChange={this.handleChange} />
                            </div>
                            <div className="night-option">
                                <label>Night Games</label>
                                <input name="3" type="checkbox" checked={tags[3]} onChange={this.handleChange} />
                            </div>
                            <div className='submit-button-wrapper'>
                                <button className='submit-button' type='submit' onClick={this.props.onClose}>Submit</button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default connect(null, { addGame, editGame, deleteGame })(Form);

