import { assert } from 'chai';
import PackageUtils from '../src/PackageUtils';
import PullRequestType from '../src/PullRequestType';

describe('Pull request title', () => {
    it('should return patch type', () => {
        assert.equal(
            PackageUtils.getPullRequestTypeFromTitle(
                'fix: correct minor typos in code'
            ),
            PullRequestType.PATCH
        );
    });

    it('should return minor type', () => {
        assert.equal(
            PackageUtils.getPullRequestTypeFromTitle('feat: '),
            PullRequestType.MINOR
        );
    });

    it('should return minor type', () => {
        assert.equal(
            PackageUtils.getPullRequestTypeFromTitle('docs: '),
            PullRequestType.MINOR
        );
    });

    it('should return major type', () => {
        assert.equal(
            PackageUtils.getPullRequestTypeFromTitle('feat!: '),
            PullRequestType.MAJOR
        );
    });
});

describe('Incrementation', () => {
    describe('patch', () => {
        it('should increment the patch version', () => {
            assert.equal(
                PackageUtils.getIncrementedVersion(
                    '1.0.0',
                    PullRequestType.PATCH
                ),
                '1.0.1'
            );
        });
    });

    describe('minor', () => {
        it('should increment the minor version', () => {
            assert.equal(
                PackageUtils.getIncrementedVersion(
                    '1.0.0',
                    PullRequestType.MINOR
                ),
                '1.1.0'
            );
        });

        it('should reset the patch version', () => {
            assert.equal(
                PackageUtils.getIncrementedVersion(
                    '1.4.9',
                    PullRequestType.MINOR
                ),
                '1.5.0'
            );
        });
    });

    describe('major', () => {
        it('should increment the major version', () => {
            assert.equal(
                PackageUtils.getIncrementedVersion(
                    '1.0.0',
                    PullRequestType.MAJOR
                ),
                '2.0.0'
            );
        });

        it('should reset the minor and patch version', () => {
            assert.equal(
                PackageUtils.getIncrementedVersion(
                    '1.4.9',
                    PullRequestType.MAJOR
                ),
                '2.0.0'
            );
        });
    });
});
