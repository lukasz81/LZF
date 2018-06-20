import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
                <header className='header display--flex'>
                    <div className={'container display--flex'}>
                        <h1 className="logo text--indent align-self--center">
                            <a className={'display--block'} title={'Little Zebra Foundation'} href={'./'}>Little Zebra Foundation</a>
                        </h1>
                        <nav className={'align-self--center'}>
                            <ul className={'display--flex text--transform-capitalize'}>
                                <li className={'align-self--center'}><a href={''}>What we do</a></li>
                                <li className={'align-self--center'}><a href={''}>Get Involved</a></li>
                                <li className={'align-self--center'}><a href={''}>Shop</a></li>
                                <li className={'align-self--center'}><a href={''}>News</a></li>
                            </ul>
                        </nav>
                        <form className={'align-self--center'}>
                            <input className={'search'} type={'search'} placeholder={'Search here'}/>
                        </form>
                        <button className={'cta text--transform-uppercase align-self--center'}>Donate now</button>
                    </div>
                </header>
        );
    }
}

export default Header;