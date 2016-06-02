import React            from 'react';
import $                from 'jquery';
import moment           from 'moment';

// Notes:
// Could switch some things around to allow user to click on the name and not just the arrow to toggle the menu items

export default React.createClass({

  getInitialState(){
    return {
      items: ['link one', ['link two', ['link three'], ['link four', ['link five'], ['link six']]]] // example nested tree menu array
    }
  },

  componentDidMount(){
    $('.menu-arrow-button').click(function(event){
      event.stopPropagation();
      $(this).siblings().slideToggle('slow');
      if (  $( this ).css( "transform" ) == 'none' ){
        $(this).css("transform","rotate(90deg)");
      } else {
        $(this).css("transform","" );
      }
    });
  },

  renderItems(item, key){

    if(Array.isArray(item)){ //assumes that if the item is an array, it is a parent node and renders as such
      return (
        <div>
          <div className="menu-arrow-button"></div>
          parent name {/* In place of the static "parent name" text, you might have the parent name rendered from an object in the array */}
          <div key={key} className="menu-parent">
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
      <div>
        {this.state.items.map(this.renderItems)}
      </div>
    )
  }
})
