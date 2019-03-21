import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    getProfileItem,
    unsubscribeFromCreator,
    subscribeToCreator
} from '../services/Stripe.Services';
import { pluralize } from '../utils/Pluralize';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        padding: 5
    },
    input: {
        display: "none"
    },
    followButton: {
        width: '100%'
    }
});

const Container = styled.article`
  display: flex;
  width: 100%;
  height: 138px;
  position: relative;
  /* border: 1px solid black; */

  .title-wrapper {
    max-height: 24px;
    /* border: 1px solid red; */
    .title {
      font-size: 1.2rem;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }

  .dropdown-dots {
    width: 40px;
    height: 40px;
    display: none;
    position: absolute;
    top: 0;
    right: 0;
  }
  :hover {
    .dropdown-dots {
      width: 40px;
      height: 40px;
      display: block;
      position: absolute;
      top: 0;
      right: 0;
    }
  }



  @media only screen and (max-width: 640px) {
    width: 100%;
    height: auto;
    margin-right: 0px;
    position: relative;
    cursor: pointer;
    height: initial;
    min-height: 138px;
    flex-direction: column;

    .profile-info-block {
      padding-top: 5px;
      padding-bottom: 5px;
      flex-direction: row;
      align-items: center;

      .avatar {
        display: block;
      }
    }

    .thumb-wrapper {
      display: flex;
      margin-right: 0px;
      width: 100%;
      max-width: initial;
    }

    .video-thumb {
      margin-right: 0px;
      width: 100%;
    }

    .thumbnail {
      margin-right: 0px;
      width: 100%;
      max-width: initial;
    }

    .description {
      display: none;
    }
  }
`;


const FollowersTag = styled.div`
font-size: 0.8rem;
color: #606060;
display: flex;
-ms-flex-direction: row;
-webkit-flex-direction: row;
flex-direction: row;
-ms-flex-align: center;
-webkit-align-items: center;
align-items: center;
i {
  padding-left: 4px;
  color: #9d9d9d;
}
`;
const BulletTag = styled.span`
  font-size: 0.8rem;
  color: #606060;
  padding-left: 5px;
  padding-right: 5px;
`;

const FollowBlock = styled.div`
  min-width: 150px;
  display: flex;
  align-items: center;
`

const ProfileInfoBlock = styled.div`
  display: flex;
  width: 100%;
  /* align-items: center; */
  flex-direction: column;
  justify-content: center;

  .avatar {
    display: none;
  }

  .info-block-wrapper {
    display: flex;
    flex-direction: column;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .meta-block {
    padding-top: 3px;
    .meta-data {
      height: 18px;
      font-size: 10px;
      display: flex;
      -ms-flex-direction: row;
      -webkit-flex-direction: row;
      flex-direction: row;
      -ms-flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      flex-wrap: wrap;
    }
  }
`;

const AvatarBlock = styled.div`
  min-width: 245px;
  /* border: 1px solid red; */
  min-height: 138px;
  display: flex;
  justify-content: center;
  margin-right: 16px;
  cursor: pointer;


  .avatar{
    width: 136px;
    height: 136px;
    border-radius: 50%;
    background-image: url(${props => props.avatar});
    background-position: 50%;
    background-size: cover;
  }

`

const DescriptionStyles = styled.p`
  color: hsl(0, 0%, 53.3%);
  padding-top: 8px;
  margin-bottom: 8px;
  display: block;
  line-height: 1.3rem;
  max-height: 3.6rem;
  overflow: hidden;
  font-size: 0.8rem;
  font-weight: 400;
  text-transform: none;
  word-break: break-word;
`;

class UserItem extends Component {
    static propTypes = {
        _id: PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);

        this.state = {
            subscribed: false,
            subscribers: [],
            subscribersCount: 0,
            subscribingCount: 0,
            imageCount: 0,
            subscribedYou: false,
            isMe: false,
            user: {
                avatar: "",
                user_name: "",
                handle: "",
                _id: ""
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    subscribeUser = userid => {
        subscribeToCreator(userid)
            .then(res => {
                let { data, status } = res;
                if (status === 200) {
                    this.setState({
                        ...data
                    });
                }
            })
            .catch(err => {
                throw err;
            });
    }

    unsubscribeUser = userid => {
        unsubscribeFromCreator(userid)
            .then(res => {
                let { data, status } = res;
                if (status === 200) {
                    this.setState({
                        ...data
                    });
                }
            })
            .catch(err => {
                throw err;
            });
    }

    render() {
        let {
            subscribed,
            subscribers,
            subscriberCount,
            subscribingCount,
            imageCount,
            subscribedYou,
            isMe,
            user
        } = this.state;
        let { _id: userid, handle, avatar, user_name } = user;
        return (
            <Container>
                <AvatarBlock onClick={() => this.props.history.push(`/Creator/${handle}`)} avatar={avatar}>
                    <div className="avatar"></div>
                </AvatarBlock>

                <ProfileInfoBlock className="profile-info-block">
                    <div className="info-block-wrapper">
                        <div className="title-wrapper">
                            <span onClick={() => this.props.history.push(`/Creator/${handle}`)} className="title">
                                {user_name}
                            </span>
                        </div>

                        <div className="meta-block">
                            <div className="meta-data">
                                <FollowersTag>
                                    {subscriberCount} {pluralize(subscriberCount, "subscriber ", "subscribers ")}
                                </FollowersTag>
                                {imageCount > 0 &&
                                    <BulletTag>•</BulletTag>
                                }

                                {imageCount > 0 &&
                                    <FollowersTag>
                                        {imageCount} {pluralize(imageCount, "image ", "images ")}
                                    </FollowersTag>
                                }

                            </div>
                        </div>
                    </div>
                </ProfileInfoBlock>
                <FollowBlock>
                    {!isMe &&
                        <Button onClick={() => subscribed ? this.unsubscribeUser(userid) : this.subscribeUser(userid)} variant="outlined" color="primary">
                            {subscribed ? "Subscribed  " : subscribedYou ? "Subscribe Back  " : "Subscribe"}
                        </Button>
                    }
                </FollowBlock>
            </Container>
        );
    }
    loadData = () => {
        let { _id, index } = this.props;
        getProfileItem(_id)
            .then(({ status, data }) => {
                if (status === 200) {
                    this.setState({
                        ...data
                    });
                }
            });
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(withStyles(styles)(UserItem));