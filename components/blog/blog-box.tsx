import React from "react";
import "./style.css";
import styled from "styled-components";

type ImageContainerProps = {
  imageUrl: string;
};

const ImageContainer = styled.div<ImageContainerProps>`
  background-image: ${props => `url(${props.imageUrl})`};
`;

const defaultProps = {
  author: "",
  description: "",
  publishedDate: "",
  readingTime: "",
  className: ""
};

type BlogBoxProps = {
  slug: string;
  imageUrl: string;
  title: string;
  tags?: Array<string>;
} & typeof defaultProps;

export const BlogBox = (props: BlogBoxProps) => {
  //const shortenedExcerpt = props.excerpt
  //.split(" ")
  //.splice(0, 20)
  //.join(" ");
  return (
    <div className={`col-lg-4 ${props.className} mt-3`}>
      <article className="card">
        <div className="card__info-hover">
          <div className="card__clock-info">
            <div>Clock Icon</div>
            <span className="card__time">15 min</span>
          </div>
        </div>
        <ImageContainer imageUrl={props.imageUrl} className="card__img" />
        <a href="#" className="card_link">
          <ImageContainer
            imageUrl={props.imageUrl}
            className="card__img--hover"
          />
        </a>
        <div className="card__info">
          {props.tags && props.tags.length > 0 && (
            <span className="card__category">{props.tags[0]}</span>
          )}
          <h3 className="card__title">{props.title}</h3>
          <span className="card__by">
            by{" "}
            <a href="#" className="card__author" title="author">
              {props.author}
            </a>
          </span>
        </div>
        <div className="card__description">{props.description}</div>
      </article>
    </div>
  );
};

BlogBox.defaultProps = defaultProps;
