import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const GetInput = (props) => {
  return (
    <div>
      <h3>What did you just eat?</h3>
      <form onSubmit={props.handleSubmit}>
        <input value={props.input} onChange={props.handleChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

const Total = (props) => {
  return props.calories !== '' && props.calories !== 0 ? (
    <div>
      {props.calories > 250 ? (
        <h3>Wow that's {props.calories} calories.</h3>
      ) : (
        <h3>Not too bad, only {props.calories} calories.</h3>
      )}
    </div>
  ) : null;
};

const Exercises = (props) => {
  if (props.value === 1 && props.unit === 'mile') {
    return <p className='slide'>{`${props.text} mile.`}</p>;
  } else if (props.value === 1 && props.unit === 'hour') {
    return <p className='slide'>{`${props.text} hour.`}</p>;
  } else if (props.value !== 1 && props.unit === 'mile') {
    return <p className='slide'>{`${props.text} miles.`}</p>;
  } else if (props.value !== 1 && props.unit === 'hour') {
    return <p className='slide'>{`${props.text} hours.`}</p>;
  }
};

const Exercise = (props) => {
  let runBurn = Math.round((props.calories / 100) * 10) / 10;
  let cycleBurn = Math.round((props.calories / 600) * 10) / 10;
  let weightBurn = Math.round((props.calories / 250) * 10) / 10;
  let sexBurn = Math.round((props.calories / 150) * 10) / 10;

  return props.calories !== '' && props.calories !== 0 ? (
    <div className='smallContainer'>
      <h3>To burn that you have to:</h3>
      <Exercises value={runBurn} unit={'mile'} text={`Run ${runBurn}`} />

      <p>Or</p>

      <Exercises value={cycleBurn} unit={'hour'} text={`Cycle for ${cycleBurn}`} />

      <p>Or</p>

      <Exercises value={weightBurn} unit={'hour'} text={`Lift weights for ${weightBurn}`} />

      <p>Or</p>

      <Exercises value={sexBurn} unit={'hour'} text={`Make sex for ${sexBurn}`} />
    </div>
  ) : null;
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      calories: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTodayData = this.getTodayData.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      calories: '',
    });
    this.getTodayData(this.state.inputValue);
  }

  getTodayData = async (food) => {
    try {
      const response = await fetch(
        `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?nutrition-type=logging&ingr=${food}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com',
            'x-rapidapi-key': '3e8f7f12d1msh89e2f6e4b63ed11p190647jsn11252f6994a3',
          },
        }
      );
      const fetchedData = await response.json();

      console.log(fetchedData);

      this.setState({
        calories: fetchedData.calories,
      });
    } catch (err) {}
  };

  render() {
    return (
      <div className='main'>
        <GetInput input={this.state.inputValue} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />

        <Total calories={this.state.calories} />
        {this.state.calories !== '' || this.state.calories !== '0' ? <Exercise calories={this.state.calories} /> : null}
      </div>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<Container />, domContainer);
