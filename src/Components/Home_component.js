import React from 'react'


function Home(){
    return(
        <div className="container under-const">
            <div className="row">
                <div className="col-11 col-sm-8 card-end center">
                    <div className="row fnt-grey text-center">
                        <div className='col-12'>
                        <p>This month's Tally</p>
                        </div>
                    </div>
                    <div className="row height fnt">
                        <div className="col-6 crd-brd-right crd-brd-btm crd-bg-1">
                            <p>5566</p>
                            <p>Verified</p>
                        </div>
                        <div className="col-6 crd-brd-btm crd-bg-2">
                            <p>0</p>
                            <p>Unverified</p>
                        </div>
                    </div>
                    <div className="row height fnt">
                        <div className="col-6 crd-brd-right crd-bg-2">
                            <p>0</p>
                            <p>New Titles</p>
                        </div>
                        <div className="col-6 crd-bg-1">
                            <p>8</p>
                            <p>Deliveries</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pd-top-1">
                <div className="col-11 col-sm-8 card-end center">
                    <div className="row fnt-grey text-center">
                        <div className='col-12'>
                        <p>Last month's Tally</p>
                        </div>
                    </div>
                    <div className="row height fnt">
                        <div className="col-6 crd-brd-right crd-brd-btm crd-bg-1">
                            <p>9966</p>
                            <p>Verified</p>
                        </div>
                        <div className="col-6 crd-brd-btm crd-bg-2">
                            <p>0</p>
                            <p>Unverified</p>
                        </div>
                    </div>
                    <div className="row height fnt">
                        <div className="col-6 crd-brd-right crd-bg-2">
                            <p>47</p>
                            <p>New Titles</p>
                        </div>
                        <div className="col-6 crd-bg-1">
                            <p>431</p>
                            <p>Deliveries</p>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    );
}

export default Home;