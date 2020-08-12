import React, {useState} from "react";
import styled from "styled-components";
import {HeartEmpty, User, Logo, Home, Search, VideoIcon, PhotoIcon, AudioIcon, TextIcon } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
import { Link } from "react-router-dom";
import {  Grid,  Segment,  Sidebar,} from 'semantic-ui-react';


const Footer = styled.footer`
  display: none;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    display: block;
    width:100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    position: fixed;
    bottom: 0px;
    background-color: #FAFAFA;
    border-top: solid 1px rgba(2,2,2,0.3);
  };
`;

const List = styled.ul`
  display: flex;
  width:100%;
  padding:0 10%;
`;

const ListItem = styled.li`
  display: inline-block;
  width: 20%;
  text-align: center;
`;

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_ANIMATION':
      return { ...state, animation: action.animation, visible: !state.visible }
    case 'CHANGE_DIMMED':
      return { ...state, dimmed: action.dimmed }
    case 'CHANGE_DIRECTION':
      return { ...state, direction: action.direction, visible: false }
    default:
      throw new Error()
  }
};

const Header = styled.div`
  display: block;
  width: 80%;
  font-size:2rem;
  padding-bottom: 10px;
`

const CloseButton = styled.div`
  background-color:white;
  width: 20%;
  border: 0px;
  font-size: 1.2rem;
  padding-top: 14px;
  text-align: right;
  cursor: defalut;
`

const Line = styled.hr`
  width:100%;
  margin: 0;
  border-color: rgba(0,0,0,0.2);
`

const Hover = styled.div`
  &:hover {
    fill:${(props) => props.theme.livingCoral}
  }
`


export default (defaultValue) => {
  const { data } = useQuery(ME);
  // const [nowTab, setNowTab] = useState("home")

  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: 'overlay',
    direction: 'bottom',
    visible: false,
  })

  const { animation, direction, visible } = state
  const vertical = direction === 'bottom'
  const [now,setNow] = useState(defaultValue)

  return (
    <Footer>
        {vertical && (
          <Sidebar
          as={Segment}
          animation={animation}
          direction={direction}
          visible={visible}
          >
          <Grid textAlign='center'>
            <Header onClick={() =>
                  dispatch({ type: 'CHANGE_ANIMATION', animation: 'overlay' })
                }>
              <h1>New Challenge</h1>
            </Header>
            <CloseButton onClick={() =>
              dispatch({ type: 'CHANGE_ANIMATION', animation: 'overlay' })
            }> X</CloseButton>
              <Line/>
            <Grid.Row columns={4}>
              <Grid.Column>
                <Hover>
                  <VideoIcon />
                </Hover>
              </Grid.Column>
              <Grid.Column>
                <Hover>
                  <PhotoIcon />              
                </Hover>
              </Grid.Column>
              <Grid.Column>
                <Hover>
                  <AudioIcon />
                </Hover>
              </Grid.Column>
              <Grid.Column>
                <Hover>
                  <TextIcon />
                </Hover>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Sidebar>
        )}
      <List>
        <ListItem>
          <Link to="/">
            <Home onClick={()=>setNow("home")} now={now}/>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/search">
            <Search onClick={()=>setNow("search")} now={now} />
          </Link>
        </ListItem>
        <ListItem>
        <div
          onClick={() =>
            dispatch({ type: 'CHANGE_ANIMATION', animation: 'overlay'})
          }
        >
          <Logo/>
        </div>
        </ListItem>
        <ListItem>
          <Link to="/notifications">
            <HeartEmpty onClick={()=>setNow("notification")} now={now}/>
          </Link>
        </ListItem>
        <ListItem>
          {!data.me ? (
            <Link to="/#">
              <User onClick={()=>setNow("profile")} now={now}/>
            </Link>
          ) : (
            <Link to={data.me.username}>
              <User onClick={()=>setNow("profile")} now={now}/>
            </Link>
          )}
        </ListItem>
      </List>
    </Footer>
  );
};
