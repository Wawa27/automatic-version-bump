import * as github from '@actions/github';
import { exec } from '@actions/exec';
import editJsonFile from 'edit-json-file';
import PackageUtils from './PackageUtils';

async function run() {
    // package.json file
    const file = editJsonFile('./package.json');
    // package.json version
    const packageVersion = file.get('version');
    console.log(`Current package version: ${packageVersion}`);

    const pullRequest = github.context.payload.pull_request;
    if (!pullRequest) {
        throw new Error('Pull request not found');
    }
    const pullRequestTitle = `${pullRequest.title}`;
    console.log(`Pull request title is : ${pullRequestTitle}`);

    // Pull request type (patch, minor or major)
    const pullRequestType = PackageUtils.getPullRequestTypeFromTitle(
        pullRequestTitle
    );
    console.log(`Pull request type is : ${pullRequestType}`);

    // Update the package version
    const newVersion = PackageUtils.getIncrementedVersion(
        packageVersion,
        pullRequestType
    );
    console.log(`Updated new version : ${newVersion}`);
    file.set('version', newVersion);

    // Save the updated package json
    file.save();

    await exec('git config --global user.name automatic-version-bump');
    await exec('git config --global user.email wawa27.pro@gmail.com');
    await exec('git add package.json');
    await exec('git pull');
    // Update last commit instead a creating a new commit
    await exec('git commit --amend --no-edit');
    await exec('git push origin -f');
}

try {
    run().then((r) => console.log('Finished job !'));
} catch (e) {
    console.error(e);
}
