import * as React from 'react';
import ComponentPanel from "./ComponentPanel";
import Panel from './Panel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { createComponent } from '../actions/componentsAction';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from './Tabs';
import Logo from '../logo.jsx';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    marginLeft: '5px',
  },
  input: {
    margin: theme.spacing(1),
    borderBottom: '2px solid #55b5e6',
    fontSize: '14',
  },
}));

export default props => {
    // input value
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();

    const classes = useStyles({});

    // useSelector grabs redux state and selects components.data value and returns
    const components = useSelector(state => state.components.data);

    const onClick = () => {
        if (components.every(data => data.name !== value)) {
            const obj = {
                name: value,
                attributes: {'id': 'ID'},
                parent: {},
                children: []
            };
            dispatch(createComponent(obj));
        }
        setValue('');
    };
    // @ts-ignore
    return <div id={'library'}>
        <div id="appName">
          <Logo />
          <h3>ProtoCAD</h3>
        </div>
        <div id="addComponent">
            <Input
                value={value}
                name={'nameInput'}
                placeholder="Component Name"
                className={classes.input}
                inputProps={{
                    'aria-label': 'description',
                }}
                onChange={e => setValue(e.target.value)}
            />
          {
            value === '' ? (
          <IconButton
            size="medium"
            onClick={onClick}
            disabled
            className={classes.button}>
            <AddIcon />
          </IconButton>) :
          <IconButton
            size="medium"
            onClick={onClick}
            className={classes.button}>
            <AddIcon />
          </IconButton>
        }
        </div>
        {/*<Panel />*/}
        <Tabs />
        {/*<ComponentPanel />*/}
    </div>
};
