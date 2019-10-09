import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {deleteComponent, setCurrentComponent, updateComponent, addChildComponent} from "../actions/componentsAction";

const Panel = props => {
   const current = useSelector(state => state.current.data);

   const dispatch = useDispatch();

   const onButtonClick = () => {
      dispatch(deleteComponent(props.name));
      props.setNext(props.index);
   };

   const onClick = () => {
      dispatch(setCurrentComponent(props));
   };

   return <div className={`panel ${current.name === props.name ? 'currentPanel' : ''}`} onClick={onClick}>
      <h4>{props.name}</h4>
      <button onClick={onButtonClick}>X</button>
   </div>
};

const AddPanel = props => {
   const dispatch = useDispatch();

   const onClick = () => {
      dispatch(addChildComponent(props.selectedNode, props.data));
      // setChange(true);
      props.handleClose();
   };

   return <div className={`panel`} onClick={onClick}>
      <h4>{props.name}</h4>
      <div>+</div>
   </div>
};

export default props => {
   // useSelector grabs redux state and selects components.data value and returns
   const components = useSelector(state => state.components.data);
   const current = useSelector(state => state.current.data);

   const dispatch = useDispatch();

   let index = 0;

   const setNext = i => index = i;

   React.useEffect(() => {
      components.forEach(data => {
         if (data.name === current.name) {
            dispatch(setCurrentComponent(data));
         }
      })
   }, [ components ]);

   return <div id={'componentPanel'}>
      {
         components.map((info, i) => props.modal ? <AddPanel key={info.name} data={info} {...info} selectedNode={props.selectedNode} handleClose={props.handleClose} /> : <Panel key={info.name} {...info} index={i} setNext={setNext} />).reverse()
      }
   </div>;
};