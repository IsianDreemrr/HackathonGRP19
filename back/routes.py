from flask import jsonify, request
from connect_db import execute_query

def register_routes(app):
    
    @app.route('/api/olympic_hosts', methods=['GET'])
    def get_olympic_hosts():
        query = "SELECT * FROM olympic_hosts"
        data = execute_query(query)
        return jsonify(data)

    @app.route('/api/olympic_medals', methods=['GET'])
    def get_olympic_medals():
        query = "SELECT * FROM olympic_medals"
        data = execute_query(query)
        return jsonify(data)

    # ... autres routes ...

    @app.route('/api/all_data', methods=['GET'])
    def get_all_data():
        hosts_query = "SELECT * FROM olympic_hosts"
        medals_query = "SELECT * FROM olympic_medals"
        results_query = "SELECT * FROM olympic_results"
        athletes_query = "SELECT * FROM olympic_athletes"
        
        hosts_data = execute_query(hosts_query)
        medals_data = execute_query(medals_query)
        results_data = execute_query(results_query)
        athletes_data = execute_query(athletes_query)
        
        all_data = {
            'hosts': hosts_data,
            'medals': medals_data,
            'results': results_data,
            'athletes': athletes_data
        }
        return jsonify(all_data)