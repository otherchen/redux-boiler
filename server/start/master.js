import os from 'os';

function createWorkers(cluster) {
  const cpuCount = 1; /* os.cpus().length; */
  for(let i = 0; i < cpuCount; ++i) {
    cluster.fork();
  }
}

function killWorker(worker) {
  try {
    worker.kill();
  } catch(err) {
    console.log(err.toString());
    console.log('Forcing worker shutdown');
    worker.process.exit(1);
  }
}

function master(cluster, options) {
  const systemState = {
    allWorkers: [],
    timeouts: [],
    restart: true,
    options: options,
    killWorker: killWorker
  };

  cluster.on('fork', function(worker) {
    this.timeouts[worker.id] = setTimeout(function(w) {
      console.log('Worker ' + w.id + ' was unable to start');
      this.killWorker(w);
    }.bind(this, worker), this.options.timeoutLength);
  }.bind(systemState));

  cluster.on('listening', function(worker) {
    clearTimeout(this.timeouts[worker.id]);
    this.allWorkers.push(worker);
    console.log('Worker ' + worker.id + ' is listening');
  }.bind(systemState));

  cluster.on('exit', function(worker, code, signal) {
    this.allWorkers.splice(this.allWorkers.indexOf(worker), 1);
    if(this.restart) {
      cluster.fork();
    }
  }.bind(systemState));

  process.on('SIGUSR2', function() {
    console.log('Rolling restart...');
    for(let i = 0; i < this.allWorkers.length; ++i) {
      this.killWorker(this.allWorkers[i]);
    }
  }.bind(systemState));

  process.on('SIGINT', function() {
    systemState.restart = false;

    for(let i = 0; i < this.allWorkers.length; ++i) {
      setTimeout(function(worker) {
        console.log('Worker ' + worker.id + ' failed to shut down gracefully. Exiting...');
        this.killWorker(worker);
      }.bind(systemState, this.allWorkers[i]), this.options.exitTimeoutLength);
    }

    setTimeout(function() { process.exit(1) }, this.options.exitTimeoutLength + 100);

    cluster.disconnect(function() {
      console.log('All workers stopped');
      process.exit(0);
    });

  }.bind(systemState));

  createWorkers(cluster);
};

export default master;
