import { exec } from 'child_process';

function executeCommand(command, secondaryCommand) {
  return new Promise((resolve, _reject) => {
    exec(command, (err, _stdout, _stderr) => {
      if (err && secondaryCommand) {
        exec(secondaryCommand, (_err, _stdout, _stderr) => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

export default executeCommand;
