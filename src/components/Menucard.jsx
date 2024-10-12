
import React from 'react';

const Menucard = ({ restaurant }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <img src={restaurant.pic} className="card-img-top" alt={restaurant.name} />
                <div className="card-body">
                    <h3 className="card-title">{restaurant.name}</h3>
                    <p className="card-text"><strong>Type:</strong> {restaurant.res_type}</p>
                    <p className="card-text"><strong>Rating:</strong> {restaurant.rating}</p>
                    <h4 className="card-subtitle mb-2 text-muted">Menu:</h4>
                    <ul className="list-group list-group-flush">
                        {Object.entries(restaurant.menu).map(([category, items]) => (
                            <li key={category} className="list-group-item">
                                <strong>{category}:</strong>
                                <ul>
                                    {items.map((item, idx) => (
                                        <li key={idx} className="d-flex justify-content-between align-items-center">
                                            {item.item}
                                            <span className="badge bg-primary rounded-pill">${item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menucard;
