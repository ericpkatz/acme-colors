import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createColor } from './store';

class _ColorForm extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      error: ''
    };
    this.save = this.save.bind(this);
  }
  async save(ev){
    ev.preventDefault();
    const color = { name: this.state.name };
    try {
      await this.props.create(color);
      this.setState({ name: '', error: ''});
    }
    catch(ex){
      this.setState({ error: ex.response.data });
    }
  }
  render(){
    const { name, error } = this.state;
    const { save } = this;
    return (
      <form onSubmit={ save }>
        <input value={ name } onChange={ ev => this.setState({ name: ev.target.value })}/>
        <button disabled={ !name }>+</button>
        {
          error ? (
            <pre>
              {
                JSON.stringify(error, null, 2)
              }
            </pre>

          ): null
        }
      </form>
    );
  }
}

const mapDispatch = (dispatch)=> {
  return {
    create: (color)=> dispatch(createColor(color))
  }
};

const ColorForm = connect(null, mapDispatch)(_ColorForm);

export default ColorForm;
