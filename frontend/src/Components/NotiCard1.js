import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  width:100%;
  max-width: 600px;
  margin:10px auto;
  justify-content: left;
`;

const EAvatar = styled(Avatar)`
  margin-right: 10px;

`;

const ELink = styled(Link)`
  color: inherit;
  margin: 5px 10px;
`;

const Temp = styled.p`
  margin: 5px 10px;
`

const NotiCard1 = ({ id, username,url,nickname }) => (
  <Card>
    <EAvatar url={url} size={"sm"} />
  
      <ELink to={`/challengepost?${id}`}>
        <FatText text={`${nickname}(@${username})님이 회원님을 지목하였습니다.`} />
      </ELink>
  </Card>
);

NotiCard1.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default NotiCard1;
