import React from 'react';
import Button from '../UI/button';
const purchasedOffers = () => {
  return (
    <>
      <div className="border border-stroke rounded-large-md p-6 space-y-6">
                    <div className="space-y-3">
                        <div className="text-text text-xl font-semibold">Highway & City Training</div>
                        <div className="text-inputtext">Master both **city and highway driving** with real-world experience alongside expert instructors.</div>
                    </div>
                    <div className="flex items-center gap-6">
                        <Button type='secondary' >View Details</Button>
                        <Button type='ghost' >Add Review</Button>
                    </div>
    </div>
      
    </>
  );
};

export default purchasedOffers;