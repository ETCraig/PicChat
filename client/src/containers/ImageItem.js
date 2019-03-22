import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pluralize } from '../utils/Pluralize';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MoreVert } from '@material-ui/icons';
import { getSearchedImage } from '../services/Image.Services';

import history from '../History';

const styles = theme => ({
  button: {
    padding: 5
  },
  input: {
    display: "none"
  }
});

const Container = styled.div`
  width: 100%;
  background: #eaeaea;
  display: flex;
  justify-content: center;
  /* height: 138px; */

  .title-wrapper {
    max-height: 24px;
    .title {
      font-size: 1.2rem;
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

  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 50%;
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

    .Image-info-block {
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
const ByUser = styled.div`
  font-size: 0.8rem;
  color: #606060;
  display: flex;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding-right: 6px;
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

const DateTag = styled.div`
  font-size: 0.8rem;
  color: #606060;
`;

const ThumbWrapper = styled.div`
  width: 100%;
  /* max-width: 246px; */
  margin-right: 16px;
  position: relative;
  cursor: pointer;
  min-height: 138px;
`;

const DurationTag = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 4px;
  color: hsl(0, 0%, 100%);
  background-color: hsl(0, 0%, 6.7%);
  opacity: 0.8;
  padding: 2px 4px;
  border-radius: 2px;
  letter-spacing: 0.5px;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 0.8rem;
  display: flex;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: inline-flex;
  z-index: 6;
`;

const ImageThumb = styled.img`
  display: block;

  width: 100%;
  height: 100%;
  min-height: 138px;
`;

const Thumbnail = styled.img`
  display: block;
  width: 50%;
  /* max-width: 245px; */
  height: 50%;
  min-height: 138px;
  position: absolute;
  z-index: 5;
  transition: 0.5s ease-in-out;
  opacity: 1;
  :hover {
    opacity: 0;
    transition: 0.5s ease-in-out;
  }
`;

const ViewCountTag = styled.div`
  font-size: 0.8rem;
  color: #606060;
  display: flex;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
`;

const ImageInfoBlock = styled.div`
  display: flex;
  width: 100%;
  /* align-items: center; */
  flex-direction: column;

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

const DescriptionStyles = styled.p`
  color: hsl(0, 0%, 53.3%);
  padding-top: 8px;
  margin-bottom: 8px;
  line-height: 1.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-size: 0.8rem;
  font-weight: 400;
  text-transform: none;
  word-break: break-word;
`;

class ImageItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      by_creator: {
        avatar: '',
        handle: '',
        user_name: ''
      },
      created: '',
      description: '',
      dislikes: 0,
      likes: 0,
      tags: [],
      title: '',
      _id: ''
    }
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  handleNavigation = () => {
    let { _id } = this.state;
    let subscribed = true;
    if (subscribed) {
      history.push(`/view/${_id}`);
    }
  }

  render() {
    let {
      title,
      image_file,
      by_creator: { handle, avatar, user_name },
      description,
      likes,
      _id,
    } = this.state;
    return (
      <Container className='image-item'>

        <ThumbWrapper className="thumb-wrapper">
          <Thumbnail
            onClick={e => this.handleNavigation()}
            className="thumbnail"
            src={image_file}
          />
        </ThumbWrapper>

        <ImageInfoBlock className="image-info-block">
          <img className="avatar" src={avatar} />
          <div className="info-block-wrapper">
            <div className="title-wrapper">
              <span className="title" onClick={e => this.handleNavigation()}>
                {" "}
                {title}
              </span>
              <IconButton
                color="secondary"
                classes={{
                  root: "dropdown-dots"
                }}
                aria-label="Add an alarm"
              >
                <MoreVert />
              </IconButton>
            </div>

            <div className="meta-block">
              <div className="meta-data">
                <ByUser onClick={() => this.props.history.push(`/Creator/${handle}`)}>
                  {user_name} <i className="fas fa-check-circle" />
                </ByUser>
                <BulletTag>•</BulletTag>
                <ViewCountTag>
                  {likes} {pluralize(likes, "like ", "likes ")}
                </ViewCountTag>
              </div>
            </div>
          </div>

          <DescriptionStyles className="description">
            {description}
          </DescriptionStyles>
        </ImageInfoBlock>
      </Container>
    );
  }
  loadData = () => {
    let { _id, index } = this.props;
    console.log('ID', _id)
    getSearchedImage(_id)
      .then(({ status, data }) => {
        if (status === 200) {
          console.log(data)
          this.setState({
            ...data
          });
        }
      })
      .catch(err => {
        throw err;
      });
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ImageItem));