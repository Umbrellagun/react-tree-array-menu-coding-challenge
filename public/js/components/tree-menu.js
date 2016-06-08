import React            from 'react';
import $                from 'jquery';
import moment           from 'moment';

export default React.createClass({

  getInitialState(){
    return {
      items: [['link one', ['link two'], ['link three', ['link four'], ['link five']]]] // example nested tree menu array
    }
  },

  componentDidMount(){
    $('.menu-button').click(function(event){
      event.stopPropagation();

      $(this).siblings('.menu-content').slideToggle('slow');

      if (  $(this).children('.menu-arrow').css( "transform" ) == 'none' ){
        $(this).children('.menu-arrow').css("transform","rotate(90deg)");
      } else {
        $(this).children('.menu-arrow').css("transform","" );
      }

    });
  },

  renderItems(item, key){

    if(Array.isArray(item)){ //assumes that if the item is an array, it is a parent node and renders as such
      return (
        <div className="menu" key={key}>
          <div className="menu-button">
            <div className="menu-arrow"></div>
            <span className="parent-name">parent name</span> {/* In place of the static "parent name" text, you might have the parent name rendered from an object in the array */}
          </div>
          <div className="menu-content">
            {item.map(this.renderItems)}
          </div>
        </div>
      )
    } else {
      return (
        <div key={key} className="menu-child">
          {item} {/* You would wrap this in a link tag with React-Router */}
        </div>
      )
    }
  },

  render(){

    return(
      <div id="menu-component">
        <h3>Tree Menu</h3>
        {this.state.items.map(this.renderItems)}
      </div>
    )
  }
})
