import React, { Component } from 'react';
import './Content.css';

export class Content extends Component {
    render() {
        return (
            <section className={'content'}>
                <h2 className={'text-transform--uppercase text-align--center text-weight--bold page-header'}>What we do</h2>
                <p className={'text-align--center page-paragraph'}>Discover more about the Little Zebra foundation and how you can help us</p>
                <div className={'container display--flex'}>
                    <article>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, magna sit amet suscipit laoreet, ante velit scelerisque massa, ac mattis ex magna et turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        <br/>
                        <br/>
                        Aliquam efficitur tellus vitae erat laoreet sodales. Donec mollis, augue nec feugiat accumsan, ante dui aliquet ante, sit amet vestibulum ligula ex non mi. Nunc quis imperdiet leo, blandit maximus orci. Phasellus porttitor eros magna, et viverra massa cursus ut. Cras nec est et urna ullamcorper volutpat et tristique augue. Nullam sit amet odio eget tortor rhoncus volutpat nec sed ipsum. Vivamus semper a ligula a sodales.
                        <br/>
                        <br/>
                        Morbi mi dui, luctus ac vestibulum in, dapibus id ante. Vivamus eu odio non mi finibus dapibus a a erat. Cras commodo pharetra sapien, non ultrices nisl egestas eu.
                        <br/>
                        <button className={'cta grey'}>Our history</button>
                        <button className={'cta yellow'}>Get involved</button>
                    </article>
                    <figure>
                        <img src={'./images/leopard-image.png'} alt={'Leopard'}/>
                    </figure>
                </div>
            </section>
        );
    }
}

export default Content;