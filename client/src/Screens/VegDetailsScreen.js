import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faPencilAlt, faPlusCircle, faStar} from '@fortawesome/free-solid-svg-icons'
import DetailVegEntry from "../component/DetailVegEntry";
import TopBar from "../component/TopBar";

const WIKI = 'https://en.wikipedia.org/wiki/'
const FAV = 'fav';

class VegDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nutrition: props.nutrition,
            editable: false,
            isFav: this.isFav(),
        }
    }

    isFav = () => {

        if (localStorage.getItem(FAV) === null) {
            this.setState({isFav: false});
            return;
        }
        return localStorage.getItem(FAV).includes(this.props.name);
    };

    handleFav = () => {
        let favList = [];
        let localStorageItem = localStorage.getItem(FAV);
        localStorageItem = JSON.parse(localStorageItem);
        if (localStorageItem != null) {
            favList = localStorageItem["veggies"];
            if (!this.state.isFav) {
                favList.push(this.props.name);
                localStorage.setItem(FAV, JSON.stringify(localStorageItem));

            } else {
                const currIdx = favList.indexOf(this.props.name);
                favList.splice(currIdx, 1);
                // console.log(favList);
            }
        } else {
            favList.push(this.props.name);
        }
        // console.log(favList);
        localStorageItem = {"token": this.props.userName, "veggies": favList};
        localStorage.setItem(FAV, JSON.stringify(localStorageItem));

        this.setState({isFav: !this.state.isFav});
    };

    onEdit = () => {
        if (this.state.editable)
            this.props.onSave(this.props.name, this.state.nutrition);
        this.setState({nutrition: this.state.nutrition, editable: !this.state.editable})
    };

    titleChanged = (nutritionIndex, newTitle) => {
        let newNutritions = Object.assign([], this.state.nutrition, {});
        newNutritions[nutritionIndex].title = newTitle;
        this.setState({nutrition: newNutritions});
        // this.state.nutrition = newNutritions;
    };

    valueChanged = (nutritionIndex, newValue) => {
        let newNutritions = Object.assign([], this.state.nutrition, {});
        newNutritions[nutritionIndex].value = newValue;
        this.setState({nutrition: newNutritions});
        // this.state.nutrition = newNutritions;
    };


    render() {
        console.log('this.props&', this.props);
        return (
            <div style={{paddingBottom: "60px"}}>
                <TopBar userName={this.props.userName}/>
                <div className='det-table'>
                    <Link to={'/' + this.props.userName + '/veggies'}>
                        <button className='back-btn'>Back</button>
                    </Link>
                    <h3 style={{lineHeight: "0"}}>Fruit info</h3>
                    <img src={this.props.img} alt="my" className='obj-image'/>
                    <span className='info-image-name'>
                        <h5>Veggie name:</h5>
                        <h3 className='head-line'>{this.props.name}
                            <span style={{display: "inline"}}>
                            <FontAwesomeIcon id='star' color={this.state.isFav ? "orange" : "black"} icon={faStar}
                                             onClick={() => this.handleFav()}/>
                            </span>
                        </h3>
                        <a href={WIKI + this.props.name} target='_blank' rel='noopener noreferrer'><button
                            className='wiki-btn'>Wiki-It</button></a>
                    </span>
                    <div>
                        <span>
                            <p className='head-lines-det'>Nutrition</p>
                            <FontAwesomeIcon onClick={this.onEdit} className='pen-icon' icon={faPencilAlt}/>
                            <FontAwesomeIcon className="icons" icon={faPlusCircle}
                                             onClick={() => this.props.onPlus(this.props.name, this.state.nutrition)}/>

                        </span>
                        <div>
                            <table className='nutrition-tbl'>
                                {this.state.nutrition.map((value, idx) => {
                                    return (
                                        <tbody key={idx} className='border-bottom'>
                                        <DetailVegEntry editable={this.state.editable} entryIdx={idx}
                                                        onDel={() => this.props.onDelete(idx)}
                                                        nutritionValueChanged={(newValue) => {
                                                            this.valueChanged(idx, newValue)
                                                        }}
                                                        nutritionTitleChanged={(newTitle) => {
                                                            this.titleChanged(idx, newTitle)
                                                        }}
                                                        from='nutrition' index={value.index} title={value.title}
                                                        value={value.value}>
                                        </DetailVegEntry></tbody>)
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default VegDetailsScreen;