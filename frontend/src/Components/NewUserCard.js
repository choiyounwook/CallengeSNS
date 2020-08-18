import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;
const EFatText = styled(FatText)`
  color:#999999;
  font-weight: 600;
  font-size: 70%;
`;

const NewUserCard = ({ id, username, isFollowing, url, isSelf, nickname }) => (
  <Card>
    <EAvatar url={url} size={"md"} />
    <ELink to={`/${username}`}>
    <FatText text={nickname} />
    </ELink>
    <ELink to={`/${username}`}>
    <EFatText text={`@${username}`} />
    </ELink>
    {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
  </Card>
);

NewUserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default NewUserCard;