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

## Error handling decision 1

action: part of businessTasks interface.

try {
- actions <- execute / throws errors
- ChangeArrayActions[action] <- send
- this.eventEmitter.emit(events.changeArrayReadyToWrite)

} catch {
- save changeArray / so that the dataChanges can be invoked later based on the saved file
}

reason:

1. actions can throw error and that should stop emition of changeArrayReadyToWrite
2. the expected actions should be stored on error, so that they can be reloaded
3. the error should state exactly which action and with what parameters went wrong, so this can be reinvoked easily

## test.runner architecture vs runner architecture