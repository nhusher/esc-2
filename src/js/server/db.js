
exports.getShipCategories = function() {
    return [
        {
            name: "Frigates",
            ships: [
                { name: 'Executioner' },
                { name: 'Inquisitor' },
                { name: 'Tormentor' },
                { name: 'Punisher' },
                { name: 'Crucifier' },
                { name: 'Magnate' }
            ],
        }, {
            name: "Cruisers",
            ships: [
                { name: 'Maller' },
                { name: 'Augoror' },
                { name: 'Arbitrator' },
                { name: 'Omen' }
            ],
        }, {
            name: "Battlecruisers",
            ships: [
                { name: 'Oracle' },
                { name: 'Prophecy' },
                { name: 'Harbinger' }
            ]
        }
    ];
}