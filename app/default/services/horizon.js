/* global angular, StellarSdk */

angular.module('app')
.factory('Horizon', function () {
	'use strict';

	var networkList = [{
		name:	'Livenet',
		phrase: 'Public Global Stellar Network ; September 2015',
		server: 'https://horizon.stellar.org'
	}, {
		name:	'Testnet',
		phrase: 'Test SDF Network ; September 2015',
		server: 'https://horizon-testnet.stellar.org'
	}];

	function getNetwork(name) {
		return networkList.filter(function (network) {
			return (network.name === name);
		})[0];
	}

	function getHash(passphrase) {
		return new StellarSdk.Network(passphrase).networkId().toString('hex').slice(0, 8);
	}

	var livenet = getHash('Public Global Stellar Network ; September 2015');

	var networks = {};
	networkList.forEach(function (network) {
		var hash = getHash(network.phrase);
		networks[hash] = network;
	});

	return {
		livenet: livenet,

		getHash: getHash,

		getNetwork: function (hash) {
			return networks[hash];
		},

		getNetworks: function () {
			return networkList;
		},

		getServer: function (hash) {
			var url = networks[hash].server;
			return new StellarSdk.Server(url);
		}
	};
});
