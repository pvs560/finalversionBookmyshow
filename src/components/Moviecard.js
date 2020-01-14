import React from "react";
import { CardDeck,Card,Button  } from 'react-bootstrap';
import PropTypes from "prop-types";

export default class MovieCard extends React.Component {

  constructor(props){
    super(props);
    console.log("moviecard constructor::",this.props.movielist);
  }


  onClick = (event)=>{
    console.log("book nlow clicked::",event.target.id);
    this.props.handleBookNow(event.target.id);
  }


    parseMovieList = (movielist)=>{
     return movielist.map(data =>         
     <Card key={data.imdbID} bsPrefix="card cardheight">
      <Card.Img variant="top" src={data.Poster} bsPrefix="card-img-top card-img-height"/>
      <Card.Body bsPrefix="card-body card-body-custom">
      <Card.Title>{data.Title}</Card.Title>
        <Card.Text>
          {data.Actors}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
      <Button variant="primary" size="lg" block id={data.imdbID} onClick={this.onClick}>
Book Now
</Button>
      </Card.Footer>
    </Card>)
       
     }

    render(){
      console.log("moviecard in props::",this.props.movielist); 
     let parsedlist = this.parseMovieList(this.props.movielist);
      return ( <>
        <CardDeck bsPrefix="card-deck custom-card-deck">
        {parsedlist}
      </CardDeck>
      </>)
    }

}

MovieCard.protoTypes = {
  movielist:PropTypes.array.isRequired,
  handleBookNow:PropTypes.func
}