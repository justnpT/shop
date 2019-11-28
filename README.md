# shop
Lets sell some shit

links useful for authenticating google spreadsheet:

https://cmichel.io/how-to-access-google-spreadsheet-with-node/

https://github.com/theoephraim/node-google-spreadsheet#service-account-recommended-method

## Setting up google sheet

1. Create  a google sheet
2. Go to https://console.developers.google.com/project
3. Create new project
4. Wait some time for it to appear in the list
5. Choose: `side-menu` => `navbar` => `administration` => `service account`
6. Click `create service account` 
7. Give it a role `editor`, `owner` or other
8. Tick `create key` and choose `json`. Keep the downloaded file
9. Click `ready`
10. Copy new service account e-mail from `json file` and share the `gsheet` with that account