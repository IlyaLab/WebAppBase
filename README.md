# Web App Base #
This project provides a Web Application Template to standardize the development of new HTML5 web applications and
web services for the [Shmulevich Group](http://shmulevich.systemsbiology.net) at the 
[Institute for Systems Biology](http://systemsbiology.org).  It allows our team to reduce development and maintainance 
time, and supports rapid prototyping.

> **Operating System Support**
> The example commands in this file are directed at Linux and Mac OS X users.  However, it should be expected (unless
> explicitly noted) that these technologies are supported by the Windows operating system.

> **Browser Support**
> The web applications developed using this template will adopt the HTML5 standard.  Usage will be supported in [compliant web browsers](http://whatbrowser.org). We will work to ensure that this template also supports tablets using HTML5 web browsers.  But we will focus our testing efforts for compatible browsers on the most commonly-used platforms: iOS and Android.

Initial Dev Setup
-----
1. Fork this repository
2. Complete [Installation Guide](https://github.com/IlyaLab/WebAppBase/blob/master/INSTALL.md) instructions 
3. Execute ```grunt server ```
4. Browser should automatically open at [http://localhost:9010](http://localhost:9010)
5. Customize README.md and INSTALL.md with specific proxies and configurations (see below)

Web Services
-----
Developers on forked web applications should configure the [Grunt](http://gruntjs.com/) web server using [*proxy.json*](blob/master/proxy.json) to point proxies at production or development [Addama](https://github.com/IlyaLab/Addama) instances and/or deploy a local [Addama](https://github.com/IlyaLab/Addama) installation.

These web services can be integrated using simple web proxies services. Example query:
   * [/datastores/ds/KIRC-SEQ-20131113/feature_matrix?gene=TP53&gene=KRAS&gene=13q13.3](https://csacr.systemsbiology.net/development/datastores/ds/KIRC-SEQ-20131113/feature_matrix?gene=TP53&gene=KRAS&gene=13q13.3)

This template accesses the following APIs presented by a deployed version of [Addama](https://github.com/IlyaLab/Addama):
```
    /datastores - GET access to NOSQL databases (i.e. MongoDB)
        HTTP query parameters accepted for filtering (?gene=TP53&gene=KRAS)

    /data - GET access to local data file repositories (e.g. tar.gz, .tsv, .img)
    
    /storage - GET/POST access to NOSQL databases (i.e. MongoDB)
        accepts arbitrary objects at arbitrary URIs
        @todo: provide example query
```

A standard development deployment should access ```/data``` and/or ```/datastores``` from a [production](https://genespot.cancerregulome.org/svc/data) or a [development service](https://csacr.systemsbiology.net/development), whereas ```/storage``` should be accessed from a  [local instance](http://localhost:9010/svc/storage).

Runtime Configuration
-----
The following files are served from [/app/configurations/](tree/master/app/configurations) directory

### display.json ###
 * Location: web services configurations path
 * Specifies identifying UI elements (e.g. titles, links in the About menu)
 * Specifies links to Hangout URL

### Example configuration ###
```json
{
    "title":"Example Project",
    "hangoutUrl":"https://plus.google.com/hangouts/_?gid={app-gid}",
    "aboutLinks":[
        {
            "label":"Institute for Systems Biology",
            "url":"http://systemsbiology.org"
        }
    ]
}
```

### datamodel.json ###
 * Location: web services configurations path
 * Specifies data source elements such as files, directories, and data services available to the application
 * Includes information such as labels and data types

> This file allows the application to dynamically associate data sources to UI views

### Example configuration ###
```json
{
    "data_sets":{
        "label":"Data Sets",
        "mutations":{
            "label":"Mutations",
            "catalog":{
                "Protein_Mutations_Per_Cancer_Type":{
                    "id":"Protein_Mutations_Per_Cancer_Type",
                    "label":"Protein Mutations Per Cancer Type",
                    "service":"lookups/mutations",
                    "description":"This dataset was prepared from TCGA MAF files produced by Firehose",
                    "model":"Mutations"
                },
                "mutsig_rankings":{
                    "id":"mutsig_rankings",
                    "label":"MutSig Rankings",
                    "service":"lookups/mutsig_rankings",
                    "description":"This dataset was prepared from TCGA MutSig 2.0 data produced by Firehose"
                },
                "mutsig_top20":{
                    "id":"mutsig_top20",
                    "label":"MutSig Top20",
                    "service":"mutsig_rankings"
                },
                "mutsig_provenance":{
                    "id":"mutsig_provenance",
                    "label":"MutSig Provenance",
                    "service":"data/provenance/mutsig_provenance.json"
                }
            }
        }
    }
}
```

### Data Model View Mappings ###
| Model | Description | Views |
| --- | --- | --- |
| FeatureMatrix | todo: fill this table | Grid, StacksVis |

> **TODO** Further documentation of data model and views

Web Server Configurations
-----
> These configuration files **SHOULD NOT** be checked-in to individual project repositories.

### proxy.json ###
  * Provides information to npm dev server
  * Configures remote and local proxies to web services

### ningx.conf ###
  * Provides information to NGINX web server
  * Configures remote and local proxies to web services
