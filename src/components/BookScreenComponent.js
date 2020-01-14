import React from "react";
import {SeatSelectionComponent} from "./SeatSelectionComponent";
import {pushHistory} from "../utils/Utils";
import PropTypes from "prop-types";
import {Card} from 'react-bootstrap';

export default class BookScreenComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            modalShow:false,
            popupbody:<><input type="checkbox" name="A1" value="A1"/>A1 
            <input type="checkbox" name="A2" value="A2"/>A2
            <input type="checkbox" name="A3" value="A3"/>A3
            <input type="checkbox" name="A4" value="A4"/>A4</>,
            statusbody:"booked successfully",
            showmessage:false
        }
    }

    handleSeatSelection = (selectedseats) =>{
        console.log("seatselected::",selectedseats);
    }

    handleSeatSelPopUp = (event)=>{
        console.log("button clicked");
        let ispopup = (this.state.modalShow)?false:true;
        if(event !== undefined && event.target.id === this.props.curSelectedMovie.imdbID){
            this.setState({modalShow:ispopup,showmessage:true});
        }
        else {
        this.setState({modalShow:ispopup});
        }
    }

    handlemessagepopUp = (event)=>{
        console.log("showmessage clicked");
        let ispopup = (this.state.showmessage)?false:true;
        this.setState({showmessage:ispopup});
        pushHistory("/");
        
    }

    constructShowTime = (showlist) =>{
    return showlist.map((data,index) => <span className="movie-padding" key={index}><button name={`time+${index}`} className="showtimebutton" onClick={this.handleSeatSelPopUp}>{data}</button></span>); 
    }

    constructTheaterData = (listdata)=>{

     return listdata.map((data)=>{
         return <div key={data.name} className="flex-container flex-container-v flexwrap width100">
         <div className="width20 flex-container flex-container-v flex-align-items-start flex-align-items-center flex-align-items-end flexwarp movie-padding showmoviename">{data.name}</div>
         <div className="width80 flex-container flex-container-v flex-align-items-start flexwrap movie-padding">{this.constructShowTime(data.showtimes)}</div>
     </div>
     })

    }

    render(){
        let theaterDomList = this.constructTheaterData(this.props.theaterlist.get(this.props.curSelectedMovie.imdbID));
        return (<>
                <section>
                 <div className="moviescreen">
                 <div className="moviescreendetails">
                 <Card border="light">
                  <Card.Img variant="top" src={this.props.curSelectedMovie.Poster} bsPrefix="card-img-top detailcardheight"/>
                  <Card.Body>
                  <Card.Title>{this.props.curSelectedMovie.Title}</Card.Title>
                  <div className="moviedetailalign"><b>Director:</b>{this.props.curSelectedMovie.Director}</div>   
                  <div className="moviedetailalign"><b>Runtime:</b>{this.props.curSelectedMovie.Runtime}
                  <b> imdbRating:</b>{this.props.curSelectedMovie.imdbRating}</div>    
                  <div className="moviedetailalign"><b>Genre:</b>{this.props.curSelectedMovie.Genre}</div> 
                  </Card.Body>
                  </Card>
                 </div>
                 <div className="moviescreentime">       
                {theaterDomList}
                </div>
                </div>
                </section>
                <SeatSelectionComponent show={this.state.modalShow} onHide={this.handleSeatSelPopUp} headername= {`Select Seats for ${this.props.curSelectedMovie.Title} Movie`} handleSeatSelection={this.handleSeatSelection} movieid={this.props.curSelectedMovie.imdbID} popupbody={this.state.popupbody} footer="Book"/>
                <SeatSelectionComponent show={this.state.showmessage} onHide={this.handlemessagepopUp} headername={this.props.curSelectedMovie.Title} handleSeatSelection={this.handleSeatSelection} movieid={this.props.curSelectedMovie.imdbID} popupbody={this.state.statusbody} footer="Ok"/>
        </>)
    }
}

BookScreenComponent.propTypes = {
    curSelectedMovie:PropTypes.object.isRequired,
    theaterlist:PropTypes.object.isRequired 
}